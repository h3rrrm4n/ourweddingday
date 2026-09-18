#!/usr/bin/env python3
"""
Botanical pavé cocktail ring mesh for Rhino 5 (millimeters).

Exports grouped OBJ (+ MTL), STL, per-part OBJs, and a zip package.
Finger hole along Z (also exports finger-Y variant).
"""

from __future__ import annotations

import math
from pathlib import Path

import numpy as np
import trimesh
from trimesh.creation import box, capsule, cylinder, icosphere, torus

OUT = Path(__file__).resolve().parents[1]
PARTS = OUT / "parts"
PARTS.mkdir(parents=True, exist_ok=True)

ID = 17.3
TH = 1.55
BW = 3.3
LIFT = 6.6
A, B, H = 6.8, 5.2, 4.2  # sapphire oval radii / depth
MR = 0.32  # melee radius


def merge(xs):
    xs = [m for m in xs if m is not None and len(getattr(m, "faces", [])) > 0]
    return trimesh.util.concatenate(xs) if xs else trimesh.Trimesh()


def boolean(a, b, op="difference"):
    try:
        r = (a.difference if op == "difference" else a.union)(b, engine="manifold")
        if isinstance(r, list):
            r = merge(r)
        if r is not None and len(r.faces) > 0:
            return r
    except Exception:
        pass
    return a if op == "difference" else merge([a, b])


def T(x=0, y=0, z=0):
    M = np.eye(4)
    M[:3, 3] = [x, y, z]
    return M


def S(sx=1, sy=1, sz=1):
    M = np.eye(4)
    M[0, 0], M[1, 1], M[2, 2] = sx, sy, sz
    return M


def Rx(d):
    a = math.radians(d)
    c, s = math.cos(a), math.sin(a)
    M = np.eye(4)
    M[1, 1], M[1, 2], M[2, 1], M[2, 2] = c, -s, s, c
    return M


def Ry(d):
    a = math.radians(d)
    c, s = math.cos(a), math.sin(a)
    M = np.eye(4)
    M[0, 0], M[0, 2], M[2, 0], M[2, 2] = c, s, -s, c
    return M


def Rz(d):
    a = math.radians(d)
    c, s = math.cos(a), math.sin(a)
    M = np.eye(4)
    M[0, 0], M[0, 1], M[1, 0], M[1, 1] = c, -s, s, c
    return M


def xf(m, *mats):
    out = m.copy()
    M = np.eye(4)
    for mat in mats:
        M = M @ mat
    out.apply_transform(M)
    return out


def gem(r=MR):
    return merge(
        [
            xf(icosphere(2, r), S(1, 0.5, 1), T(0, r * 0.1, 0)),
            xf(icosphere(2, r * 0.88), S(0.8, 0.65, 0.8), T(0, -r * 0.2, 0)),
            xf(cylinder(r * 0.48, r * 0.06, sections=10), T(0, r * 0.35, 0)),
        ]
    )


def put_gem(p, n=None, r=MR):
    p = np.asarray(p, float)
    if n is None:
        n = np.array([p[0], abs(p[1]) * 0.4 + 0.2, p[2] * 0.3])
    n = n / (np.linalg.norm(n) + 1e-9)
    return merge([xf(gem(r), T(*(p + n * r * 0.2))), xf(icosphere(1, r * 0.45), T(*(p - n * 0.1)))])


# ---- parts ----

def shank():
    major = ID / 2 + TH / 2
    band = torus(major, TH / 2, 180, 48)
    band.apply_transform(S(1, 1, BW / TH))
    # keep lower shank clean: only mild upper thickening
    pads = []
    for ang in np.linspace(-50, 50, 11):
        th = math.radians(ang)
        r = ID / 2 + TH * 0.95
        pads.append(
            xf(
                capsule(0.7, 1.6, count=[16, 8]),
                S(1.1, 1.0, BW / 2.0),
                T(r * math.sin(th), r * math.cos(th), 0),
                Rz(-ang),
            )
        )
    return merge([band] + pads)


def angular_scale(w, h, d):
    """Angular overlapping plate like the reference shoulders."""
    # diamond / kite-ish footprint via box unions
    base = box([w, h, d])
    wedge = xf(box([w * 0.7, h * 0.55, d * 0.85]), T(0, h * 0.28, d * 0.08), Rx(-8))
    edge = xf(box([w * 1.02, h * 0.18, d * 0.25]), T(0, h * 0.4, d * 0.3))
    return merge([base, wedge, edge])


def shoulders():
    plates, anchors = [], []
    # denser angular cascade
    spec = [
        (10, 5, 4.6, 2.1, 1.35, 1.35),
        (20, 4, 4.3, 2.0, 1.28, 1.25),
        (30, 4, 4.0, 1.9, 1.2, 1.15),
        (40, 3, 3.6, 1.75, 1.12, 1.0),
        (50, 3, 3.2, 1.6, 1.05, 0.85),
        (60, 2, 2.8, 1.45, 0.98, 0.7),
        (70, 2, 2.35, 1.3, 0.9, 0.55),
        (80, 1, 1.9, 1.15, 0.82, 0.35),
    ]
    for side in (-1.0, 1.0):
        for ang, n, w, h, d, zsp in spec:
            for i in range(n):
                z = (i - (n - 1) / 2) * zsp
                la = ang + (i - (n - 1) / 2) * 1.8
                th = math.radians(side * la)
                r = ID / 2 + TH + 0.35
                o = np.array([r * math.sin(th), r * math.cos(th), z])
                nrm = np.array([math.sin(th), math.cos(th), 0.05])
                nrm /= np.linalg.norm(nrm)
                u = np.array([-math.cos(th), math.sin(th), 0.0])
                v = np.cross(nrm, u)
                v /= np.linalg.norm(v) + 1e-9
                p = angular_scale(w, h, d)
                plates.append(xf(p, T(*o), Rz(side * la), Rx(18), Ry(side * -12)))
                anchors.append((o + nrm * d * 0.65, nrm, u, v, w * 0.7, h * 0.55))
                # outer overlap
                o2 = o + nrm * 0.42 + u * side * 0.15
                p2 = angular_scale(w * 0.8, h * 0.82, d * 0.65)
                plates.append(xf(p2, T(*o2), Rz(side * la + side * 6), Rx(26), Ry(side * -8)))
                anchors.append((o2 + nrm * 0.35, nrm, u, v, w * 0.55, h * 0.45))
    return merge(plates), anchors


def bee_motif(side):
    """Four pointed wings + raised center (bee/flower)."""
    parts = [icosphere(3, 1.05)]
    for ang in (45, 135, 225, 315):
        # pointed petal: long box tapered
        wing = xf(box([2.6, 1.05, 0.75]), S(1.0, 0.65, 0.85))
        # cut tip to point
        cut = xf(box([1.4, 1.3, 1.1]), T(1.5, 0, 0), Rz(45), S(0.55, 1, 1))
        wing = boolean(wing, cut, "difference")
        wing = xf(wing, Rz(ang), T(1.35, 0, 0.08))
        tip = xf(icosphere(2, 0.36), Rz(ang), T(2.45, 0, 0.18))
        parts += [wing, tip]
    m = merge(parts)
    th = math.radians(side * 28)
    r = ID / 2 + TH + 1.55
    m.apply_transform(T(r * math.sin(th), r * math.cos(th) + 0.35, side * 0.08) @ Rz(side * 28) @ Rx(-22) @ S(1.05, 1.05, 1))
    c = m.centroid
    anch = []
    for k in range(24):
        a = 2 * math.pi * k / 24
        p = c + np.array([1.35 * math.cos(a), 0.25, 1.35 * math.sin(a)])
        n = (p - c)
        n /= np.linalg.norm(n)
        anch.append((p + n * 0.25, n, None, None, None, None))
    return m, anch


def leaf_prong(i):
    """Flatter leaf claw wrapping onto the oval stone crown."""
    body = xf(capsule(0.42, 5.6, count=[24, 12]), S(1.7, 0.48, 1.0))
    mid = xf(icosphere(2, 0.55), T(0, 0.04, 0.4), S(1.8, 0.4, 1.4))
    tip = xf(icosphere(3, 0.55), T(0, 0.04, 3.15), S(1.35, 0.65, 0.8))
    ridge = xf(box([0.18, 0.28, 4.2]), T(0, 0.22, 0.15))
    notches = [
        xf(icosphere(1, 0.22), T(0.48 * (1 if k % 2 == 0 else -1), 0.04, z), S(0.65, 0.35, 1.0))
        for k, z in enumerate(np.linspace(-1.8, 2.4, 6))
    ]
    leaf = merge([body, mid, tip, ridge] + notches)
    place = [
        (-28, 58, -A * 0.82, B * 0.05, H * 0.08),
        (28, 58, A * 0.82, B * 0.05, H * 0.08),
        (-155, 68, -A * 0.42, -B * 0.72, 0.0),
        (155, 68, A * 0.42, -B * 0.72, 0.0),
    ]
    yaw, pitch, x, zz, z = place[i]
    hy = ID / 2 + LIFT
    return xf(leaf, T(x, hy + z, zz), Ry(yaw), Rx(pitch), T(0, 0, -0.95))


def top_bud():
    hy = ID / 2 + LIFT
    return xf(icosphere(3, 1.15), T(0.05, hy + 1.15, -B * 0.88), S(1.0, 0.75, 1.05))


def sapphire():
    """Clean oval center stone: crown + girdle + pavilion."""
    crown = xf(icosphere(4, 1.0), S(A, H * 0.28, B), T(0, H * 0.12, 0))
    # flat table
    crown = boolean(crown, xf(box([A * 2.5, 1.2, B * 2.5]), T(0, H * 0.42, 0)))
    pavilion = xf(icosphere(4, 1.0), S(A * 0.92, H * 0.34, B * 0.92), T(0, -H * 0.12, 0))
    gird = torus((A + B) * 0.28, 0.18, 80, 14)
    gird.apply_transform(Rx(90) @ S(A / ((A + B) * 0.28), 1.0, B / ((A + B) * 0.28)))
    body = merge([crown, pavilion, gird])
    body.apply_transform(T(0, ID / 2 + LIFT, 0))
    return body


def halo():
    hy = ID / 2 + LIFT - H * 0.2
    gems = []
    for i in range(44):
        t = 2 * math.pi * i / 44
        p = [(A + 0.55) * math.cos(t), hy, (B + 0.45) * math.sin(t)]
        gems.append(put_gem(p, [math.cos(t), 0.15, math.sin(t)], MR * 0.85))
    rim = torus((A + B) * 0.33, 0.28, 72, 12)
    rim.apply_transform(T(0, hy, 0) @ Rx(90) @ S(1.12, 0.9, 1))
    return merge([rim] + gems)


def gallery():
    hy = ID / 2 + LIFT - 2.7
    base = xf(cylinder(5.0, 0.5, sections=64), T(0, hy, 0), Rx(90))
    for row, z in enumerate(np.linspace(-2.2, 2.2, 5)):
        for x in np.linspace(-2.6, 2.6, 6 if row % 2 == 0 else 5):
            base = boolean(
                base,
                xf(cylinder(0.52, 1.8, sections=6), T(x + (0.28 if row % 2 else 0), hy, z), Rx(90)),
            )
    braces = [xf(box([0.28, 0.38, 4.4]), T(0, hy, 0), Ry(a)) for a in range(0, 360, 30)]
    wall = torus(4.5, 0.32, 64, 12)
    wall.apply_transform(T(0, hy, 0) @ Rx(90))
    legs = []
    for ang in (-38, -14, 14, 38):
        th = math.radians(ang)
        legs.append(xf(box([0.5, 4.2, 0.42]), T(3.2 * math.sin(th), hy - 1.9, 0), Rz(ang), Rx(16)))
    return merge([base, wall] + braces + legs)


def pave_anchors(anchors, spacing=0.68):
    gems, seen = [], []
    for o, n, u, v, wu, wv in anchors:
        o = np.asarray(o, float)
        if u is None:
            if any(np.linalg.norm(o - q) < spacing for q in seen):
                continue
            seen.append(o)
            gems.append(put_gem(o, n))
            continue
        nu = max(2, int(wu / spacing))
        nv = max(2, int(wv / spacing))
        for iv in range(nv):
            for iu in range(nu):
                su = (iu / (nu - 1) - 0.5) * wu
                sv = (iv / (nv - 1) - 0.5) * wv
                if iv % 2:
                    su += spacing * 0.45
                p = o + u * su + v * sv
                if any(np.linalg.norm(p - q) < spacing * 0.82 for q in seen):
                    continue
                seen.append(p)
                gems.append(put_gem(p, n))
    print("  anchor pave", len(seen))
    return merge(gems)


def pave_mesh(host, spacing, max_n, y_min=None):
    pts = host.sample(min(7000, max(400, len(host.faces) * 2)))
    if isinstance(pts, tuple):
        pts = pts[0]
    seen, gems = [], []
    for p in pts:
        if y_min is not None and p[1] < y_min:
            continue
        if math.hypot(p[0], p[1]) < ID / 2 + 0.55:
            continue
        if any(np.linalg.norm(p - q) < spacing for q in seen):
            continue
        seen.append(p.copy())
        gems.append(put_gem(p))
        if len(seen) >= max_n:
            break
    print("  mesh pave", len(seen))
    return merge(gems)


def write_obj(path, groups):
    lines = ["# Botanical pave cocktail ring — Rhino 5", "# Units: millimeters", "mtllib botanical_pave_ring.mtl", ""]
    off = 1
    for name, mesh in groups.items():
        if mesh is None or len(mesh.faces) == 0:
            continue
        mesh = mesh.copy()
        mesh.remove_unreferenced_vertices()
        mat = "sapphire" if "sapphire" in name else ("diamond" if ("pave" in name or "halo" in name) else "white_metal")
        lines += [f"o {name}", f"g {name}", f"usemtl {mat}"]
        for v in mesh.vertices:
            lines.append(f"v {v[0]:.5f} {v[1]:.5f} {v[2]:.5f}")
        nrm = mesh.vertex_normals
        ok = nrm is not None and len(nrm) == len(mesh.vertices)
        if ok:
            for n in nrm:
                lines.append(f"vn {n[0]:.5f} {n[1]:.5f} {n[2]:.5f}")
        for f in mesh.faces:
            a, b, c = (f + off).tolist()
            lines.append(f"f {a}//{a} {b}//{b} {c}//{c}" if ok else f"f {a} {b} {c}")
        off += len(mesh.vertices)
        lines.append("")
    path.write_text("\n".join(lines))


def write_mtl(path):
    path.write_text(
        """newmtl white_metal
Ka 0.2 0.2 0.22
Kd 0.78 0.79 0.82
Ks 0.95 0.95 0.97
Ns 900
illum 2

newmtl diamond
Ka 0.1 0.1 0.1
Kd 0.94 0.94 0.96
Ks 1 1 1
Ns 1300
illum 2

newmtl sapphire
Ka 0.02 0.04 0.15
Kd 0.08 0.22 0.72
Ks 0.85 0.9 1
Ns 1100
illum 2
"""
    )


def main():
    print("Metal structure...")
    sh = shank()
    sc, anch = shoulders()
    ml, al = bee_motif(-1)
    mr, ar = bee_motif(1)
    pr = merge([leaf_prong(i) for i in range(4)])
    bud = top_bud()
    sap = sapphire()
    hal = halo()
    gal = gallery()

    print("Pavé...")
    pave = merge(
        [
            pave_anchors(anch + al + ar, spacing=0.66),
            pave_mesh(merge([pr, bud]), spacing=0.64, max_n=300),
        ]
    )

    groups = {
        "01_shank_polished": sh,
        "02_scale_shoulders": sc,
        "03_shoulder_motif_L": ml,
        "04_shoulder_motif_R": mr,
        "05_leaf_prongs": pr,
        "06_top_bud": bud,
        "07_hidden_halo": hal,
        "08_ajoure_gallery": gal,
        "09_pave_melee": pave,
        "10_center_sapphire": sap,
    }

    write_mtl(OUT / "botanical_pave_ring.mtl")
    write_obj(OUT / "botanical_pave_ring.obj", groups)
    write_obj(
        OUT / "botanical_pave_ring_metal_only.obj",
        {k: v for k, v in groups.items() if not k.startswith("09") and not k.startswith("10") and not k.startswith("07")},
    )
    combined = merge(list(groups.values()))
    combined.export(OUT / "botanical_pave_ring.stl")
    write_obj(OUT / "botanical_pave_ring_fingerY.obj", {k: xf(v, Rx(-90)) for k, v in groups.items()})

    for name, mesh in groups.items():
        mesh.export(PARTS / f"{name}.obj")
        print(f"  {name}: {len(mesh.faces)} faces")

    (OUT / "RHINO5_IMPORT.md").write_text(
        f"""# Botanical Pavé Cocktail Ring — Rhino 5 package

Detailed mesh study inspired by a high-jewelry botanical / bee-motif pavé cocktail ring
(oval blue center stone, leaf prongs, cascading angular shoulders, hidden halo, ajouré gallery).

## Import these

1. **`botanical_pave_ring.obj`** (+ `botanical_pave_ring.mtl`) — full model, **preferred**
2. `botanical_pave_ring_metal_only.obj` — structure only (easier to edit)
3. `botanical_pave_ring.stl` — single mesh
4. `botanical_pave_ring_fingerY.obj` — finger hole along Y
5. `parts/*.obj` — separate components
6. Or unzip `botanical_pave_ring_Rhino5.zip`

## Rhino 5

```
_Import  → botanical_pave_ring.obj
_Units   → Millimeters
_Zoom _All _Extents
```

Objects import separately (`01_shank_polished` … `10_center_sapphire`). Assign platinum / diamond / sapphire materials. Optional: `_MeshToNurb` per part for surface work.

## Size

Inner Ø ≈ **{ID} mm** (≈ US 7). Scale uniformly for other sizes.

## Note

High-poly visualization / CAD reference mesh — refine organic surfaces and pavé seats in Rhino, Matrix, or JewelCAD before manufacturing. Brand engravings are intentionally omitted.
"""
    )
    print("faces", len(combined.faces), "bounds", np.round(combined.bounds, 2))
    print("out", OUT)


if __name__ == "__main__":
    main()
