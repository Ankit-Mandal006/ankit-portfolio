# SECTION 01 — WHAT: Project Overview & Gameplay

# SECTION 01 — WHAT: Project Overview & Gameplay

# SECTION 01 — WHAT: Project Overview & Gameplay

# SECTION 01 — WHAT: Project Overview & Gameplay

# SECTION 01 — WHAT: Project Overview & Gameplay

# SECTION 01 — WHAT: Project Overview & Gameplay

# SECTION 01 — WHAT: Project Overview & Gameplay

```
                               ┌─────────────────────────────┐
                               │         WITHERWOODS         │
                               └──────────────┬──────────────┘
                                              │
                 ┌────────────────────────────┼────────────────────────────┐
                 │                            │                            │
                 ▼                            ▼                            ▼
        ┌─────────────────┐          ┌─────────────────┐          ┌─────────────────┐
        │  PLAYER & TOOLS │          │ WORLD & PORTALS │          │  AI & ENTITIES  │
        ├─────────────────┤          ├─────────────────┤          ├─────────────────┤
        │ • CC Controller │          │ • Multi-Terrain │          │ • Creature AI   │
        │ • Flashlight    │          │ • Maze Portal   │          │ • Sprite Stalker│
        │ • 3D Compass    │          │ • Doorway Loop  │          │ • Footstep Proximity
        │ • Bush Stealth  │          │ • Orb Dimension │          │ • Stunnable/Kill│
        │ • Projectile MP │          │ • Diegetic Thund│          │ • JumpScare Reset│
        └─────────────────┘          └─────────────────┘          └─────────────────┘
                 │                            │                            │
                 └────────────────────────────┼────────────────────────────┘
                                              │
                                              ▼
                                   ┌─────────────────────┐
                                   │ PROGRESSION & MODES │
                                   ├─────────────────────┤
                                   │ • Relic Sockets     │
                                   │ • Boss Showdown     │
                                   │ • Survival Mode     │
                                   │ • JSON Settings     │
                                   └─────────────────────┘
```

---

## 1. Project Overview

*WitherWoods* is a first-person psychological survival horror game built in Unity 2022.3 (URP). The player awakens trapped in a dark, mist-shrouded forest stalked by lethal supernatural creatures. To escape, the player must locate transient dimensional portals scattered across terrain sectors, venture into surreal pocket dimensions (such as shifting mazes, infinite looping doorways, and orb-cleansing arenas), solve occult challenges to claim sacred Relics (Skulls and Crystals), and transport them back to an ancient Main Portal.

The game features dual game modes:
1. **Story Campaign**: A structured multi-phase journey comprising narrative prologue tutorials (`tutorial1.unity`, `tutorial2.unity`), the sprawling multi-terrain hub forest (`Forest.unity`), and a climactic multi-phase boss encounter against the corrupted Heart entity (`LastLevel.unity`).
2. **Survival Mode** (`Survival.unity`): An endurance gauntlet where the player tests their stealth and evasion against dynamically scaling enemy waves and tracking timers.

---

## 2. One-Minute Game Explanation

In *WitherWoods*, light is both your only lifeline and your greatest liability.

* **What you do:** You explore a massive, pitch-black forest armed only with a directional compass and a toggleable flashlight.
* **The Core Tension:** Turning on your flashlight illuminates hidden paths and allows you to freeze certain shadow entities, but it instantly doubles the detection radius of apex predators (`CreatureAI`) from 10 meters to 20 meters.
* **The Interaction Loop:** You navigate between randomized portals, enter hostile sub-dimensions to retrieve 6 Skulls and 3 Crystals, carry them one-by-one while balancing your stamina, stealth in dense foliage bushes, and deposit them into the central portal monolith while managing escalation triggers.

---

## 3. Core Gameplay Loop

```
                           ┌────────────────────────────┐
                           │   Spawn / Regroup at Hub   │
                           └─────────────┬──────────────┘
                                         │
                                         ▼
                     ┌─────────────────────────────────────────┐
                     │    Traverse Forest via Compass & Light  │
                     │  (Avoid Apex Stalker / Hide in Bushes)  │
                     └───────────────────┬─────────────────────┘
                                         │
                                         ▼
                     ┌─────────────────────────────────────────┐
                     │       Locate & Enter Pocket Portal      │
                     └───────────────────┬─────────────────────┘
                                         │
                        ┌────────────────┴────────────────┐
                        ▼                                 ▼
             ┌─────────────────────┐           ┌─────────────────────┐
             │   Solve Dimension   │           │   Fail Timer / Run  │
             │      Challenge      │           │    (Captured)       │
             └──────────┬──────────┘           └──────────┬──────────┘
                        │                                 │
                        ▼                                 ▼
             ┌─────────────────────┐           ┌─────────────────────┐
             │  Extract Relic      │           │ Relocate Portal &   │
             │  (Crystal / Skull)  │           │ Jumpscare Respawn   │
             └──────────┬──────────┘           └──────────┬──────────┘
                        │                                 │
                        ▼                                 │
             ┌─────────────────────┐                      │
             │ Socket Relic at     │                      │
             │ Main Monolith       │                      │
             └──────────┬──────────┘                      │
                        │                                 │
                        ▼                                 │
             ┌─────────────────────┐                      │
             │ Escalate Threat /   │                      │
             │ Unlock Boss Level   │                      │
             └──────────┬──────────┘                      │
                        │                                 │
                        └─────────────────────────────────┘
```

---

## 4. Player Experience & Emotional Beats

| Player Action | Sensory Feedback | Mechanical Consequence | Emotional Beat |
| :--- | :--- | :--- | :--- |
| **Toggling Flashlight (`F`)** | Light cone illuminates trees; UI icon brightens; distinct audio click. | Expands enemy detection range from 10m to 20m; freezes `SpritAI`. | **Calculated Risk:** Desperation for visibility vs fear of attracting predators. |
| **Crouching in Bush (`E`)** | Text indicator disappears; flashlight forcibly turned off; camera lowered. | AI switches to randomized wandering around bush; sightline broken. | **Claustrophobic Tension:** Holding breath in pitch darkness while footstep audio circles nearby. |
| **Distant Thunder Crack** | Directional spotlight & particle surge 18m ahead pointing to portal. | Informs player of portal direction without 2D UI navigation arrows. | **Relief & Urgency:** Ephemeral clarity breaking the oppressive disorientation. |
| **Entering Pocket Dimension** | Seamless character coordinate shift; eerie audio drone; ambient lighting shift. | Activates localized ruleset (100s timer, weeping stalker, looping doors). | **Dread & Focus:** Sudden transition from macro-survival to micro-puzzle solving. |
| **Heart Boss Combat** | Projectile impact explosions; shield depletion audio; energy charging HUD. | Managing zone positioning to recharge ammo while dodging boss minions. | **Mastery & Empowerment:** Shifting from pure evasion to active tactical resistance. |

---

## 5. Feature Overview

* **Player Locomotion & Interaction Suite:** First-person character controller, pitch-clamped mouse look, contextual object grabbing/socketing, and dual-hand animation layering (`PlayerMovement.cs`, `MouseLook.cs`, `PlayerInventory.cs`).
* **Stealth & Sensory AI Engine:** Multi-tiered enemy archetypes including dynamic patrol-sniff predators (`CreatureAI.cs`) and gaze-direction-locked weeping stalkers (`SpritAI.cs`).
* **Dynamic Pocket Dimension Architecture:** Multi-zone portal spawning with terrain flatness validation, timed maze sequences (`MazeTimer.cs`), infinite doorway shuffling (`InfiniteDoorWay.cs`), and magical shield mechanics (`DeActivateShield.cs`).
* **Diegetic Environmental Navigation:** Atmospheric lightning triangulation (`Thundering.cs`) and needle-based 3D HUD compass tracking (`PortalCompass.cs`).
* **Configurable Graphics & Persistence Pipeline:** Dynamic URP detail density, antialiasing modes, mipmap limit scaling, and JSON-based settings saving (`PauseMenu.cs`).
