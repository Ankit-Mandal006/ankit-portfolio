
# WitherWoods: Technical & Systems Design Case Study
**A Deep-Dive into Multi-Terrain AI Navigation, Diegetic Horror Mechanics, and Procedural Dimension Systems in Unity URP**

---

## Executive Summary

* **Game:** *WitherWoods*
* **Genre:** First-Person Psychological & Survival Horror / Objective-Extraction & Boss Showdown
* **Engine / Technology:** Unity 2022.3.62f1, Universal Render Pipeline (URP 14.0.12), NavMesh AI Navigation, C# (.NET Standard)
* **Target Platform:** PC (Windows)
* **Team Size:** Solo Developer / Small Indie Team
* **Role:** Solo Technical Game Designer & Gameplay Programmer
* **Development Scope:** Multi-level game featuring interconnected dimension puzzles, stealth AI, multi-terrain systems, and boss combat
* **Development Timeframe:** 3 Months
* **Core Challenge:** Engineering tense stealth and pursuit AI across expansive multi-terrain environments while maintaining immersive, diegetic navigation without relying on immersion-breaking mini-maps or UI clutter.
* **Technical Highlight:** A diegetic audio-visual lightning triangulation system calculating player-to-objective vectors in 3D space, combined with multi-terrain flatness-checked procedural portal distribution, distance-based terrain culling, and JSON persistence.
* **Design Highlight:** Flashlight mechanics that serve as an asymmetric tactical choice—illuminating paths and immobilizing gaze-locked stalkers while doubling predator perception ranges from 10m to 20m.

---

> [!NOTE]
> ### Epistemic Status & Verification Key
> * **[Verified]**: Directly verified through source code, scenes, shader configurations, and package manifests in the project repository.
> * **[Inferred]**: Strongly supported by architectural patterns and gameplay implementation, but subject to developer confirmation.
> * **[Developer Input Required]**: Contextual details, personal post-mortems, team dynamics, or exact historical timelines that require developer input.
