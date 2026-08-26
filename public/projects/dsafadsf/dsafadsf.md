---
title: adsfds
tagline: adsf
engine: ''
role: ''
duration: ''
cover: ''
screenshots: []
technologies: []
trailer: ''
itch: ''
github: ''
featured: false
slug: dsafadsf
---
# WitherWoods: Technical & Systems Design Case Study
**A Deep-Dive into Multi-Terrain AI Navigation, Diegetic Horror Mechanics, and Procedural Dimension Systems in Unity URP**

---

## Executive Summary

* **Game:** *WitherWoods*
* **Genre:** First-Person Psychological & Survival Horror / Objective-Extraction & Boss Showdown
* **Engine / Technology:** Unity 2022.3.62f1, Universal Render Pipeline (URP 14.0.12), NavMesh AI Navigation, C# (.NET Standard)
* **Target Platform:** PC (Windows)
* **Team Size:** `[ADD TEAM SIZE — e.g., Solo Developer / Small Indie Team]`
* **Role:** `[ADD MY ROLE — e.g., Solo Technical Game Designer & Gameplay Programmer]`
* **Development Scope:** `[ADD PROJECT DESCRIPTION / SCOPE — Multi-level game featuring interconnected dimension puzzles, stealth AI, multi-terrain systems, and boss combat]`
* **Development Timeframe:** `[ADD DEVELOPMENT TIMEFRAME — e.g., 3 Months]`
* **Core Challenge:** Engineering tense stealth and pursuit AI across expansive multi-terrain environments while maintaining immersive, diegetic navigation without relying on immersion-breaking mini-maps or UI clutter.
* **Technical Highlight:** A diegetic audio-visual lightning triangulation system calculating player-to-objective vectors in 3D space, combined with multi-terrain flatness-checked procedural portal distribution, distance-based terrain culling, and JSON persistence.
* **Design Highlight:** Flashlight mechanics that serve as an asymmetric tactical choice—illuminating paths and immobilizing gaze-locked stalkers while doubling predator perception ranges from 10m to 20m.

---

> [!NOTE]
> ### Epistemic Status & Verification Key
> * **[Verified]**: Directly verified through source code, scenes, shader configurations, and package manifests in the project repository.
> * **[Inferred]**: Strongly supported by architectural patterns and gameplay implementation, but subject to developer confirmation.
> * **[Developer Input Required]**: Contextual details, personal post-mortems, team dynamics, or exact historical timelines that require developer input.

---

# SECTION 01 — WHAT

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

> **[DIAGRAM PLACEHOLDER — High-level feature hierarchy and system breakdown]**

---

## 1. Project Overview

*WitherWoods* is a first-person psychological survival horror game built in Unity 2022.3 (URP). The player awakens trapped in a dark, mist-shrouded forest stalked by lethal supernatural creatures. To escape, the player must locate transient dimensional portals scattered across terrain sectors, venture into surreal pocket dimensions (such as shifting mazes, infinite looping doorways, and orb-cleansing arenas), solve occult challenges to claim sacred Relics (Skulls and Crystals), and transport them back to an ancient Main Portal.

The game features dual game modes:
1. **Story Campaign**: A structured multi-phase journey comprising narrative prologue tutorials (`tutorial1.unity`, `tutorial2.unity`), the sprawling multi-terrain hub forest (`Forest.unity`), and a climactic multi-phase boss encounter against the corrupted Heart entity (`LastLevel.unity`).
2. **Survival Mode** (`Survival.unity`): An endurance gauntlet where the player tests their stealth and evasion against dynamically scaling enemy waves and tracking timers.

---

## 2. One-Minute Game Explanation

> **[VIDEO PLACEHOLDER — 60-Second Core Gameplay Teaser showing forest navigation, flashlight toggling, creature stealth, portal entry, and relic socketing]**

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

> **[FLOWCHART PLACEHOLDER — Gameplay loop flow diagram mapping exploration, challenge, risk, extraction, and progression]**

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

> **[IMAGE PLACEHOLDER — Composite screenshot showcasing the dark forest terrain, the HUD compass, the relic pedestal, and the monster stalking between trees]**

* **Player Locomotion & Interaction Suite:** First-person character controller, pitch-clamped mouse look, contextual object grabbing/socketing, and dual-hand animation layering (`PlayerMovement.cs`, `MouseLook.cs`, `PlayerInventory.cs`).
* **Stealth & Sensory AI Engine:** Multi-tiered enemy archetypes including dynamic patrol-sniff predators (`CreatureAI.cs`) and gaze-direction-locked weeping stalkers (`SpritAI.cs`).
* **Dynamic Pocket Dimension Architecture:** Multi-zone portal spawning with terrain flatness validation, timed maze sequences (`MazeTimer.cs`), infinite doorway shuffling (`InfiniteDoorWay.cs`), and magical shield mechanics (`DeActivateShield.cs`).
* **Diegetic Environmental Navigation:** Atmospheric lightning triangulation (`Thundering.cs`) and needle-based 3D HUD compass tracking (`PortalCompass.cs`).
* **Configurable Graphics & Persistence Pipeline:** Dynamic URP detail density, antialiasing modes, mipmap limit scaling, and JSON-based settings saving (`PauseMenu.cs`).

---

# SECTION 02 — WHY

```
                          DESIGN PHILOSOPHY & REASONING
                          
         Atmospheric Immersion                 Spatial Systems Design
      (Diegetic audio-visual cues,          (Multi-terrain portal spawning
       no intrusive floating HUD)             with slope/flatness checks)
                   │                                     │
                   ▼                                     ▼
        ┌───────────────────────────────────────────────────┐
        │                 ENGINEERING CHOICES               │
        │                                                   │
        │ • Vector3 Thunder Triangulation                   │
        │ • Heightmap Neighbor Slope Sampling               │
        │ • Vector Dot Product Gaze-Locking                 │
        │ • Multi-Terrain Distance Culling Manager          │
        └───────────────────────────────────────────────────┘
```

---

## 6. Design Decisions

### Decision 1: Diegetic Lightning Guidance vs Traditional HUD Waypoints

* **Decision [Verified]:** Rather than drawing 3D floating waypoint markers or a 2D mini-map, the game calculates the vector between the player and the active portal, periodically positioning a spotlight and particle emitter 18 meters ahead of the player facing backward (`Thundering.cs`).
* **Problem [Verified]:** Players exploring massive multi-tile terrains in pitch darkness frequently experience complete disorientation, frustrating core objective discovery.
* **Alternatives Considered [Inferred]:**
  1. *Screen-space UI compass / radar markers.*
  2. *Constant glowing particle trail / breadcrumbs.*
  3. *Static towering beacon of light over the portal.*
* **Why This Approach [Verified]:** A periodic directional lightning strike preserves the oppressive atmosphere of a disorienting forest while giving players an actionable compass direction every 30 seconds.
* **Player Impact [Inferred]:** Builds psychological relief during lightning flashes while demanding that players pay close attention to environmental cues rather than staring at a mini-map.
* **Technical Impact [Verified]:** Minimal runtime overhead (`Vector3.Distance` check and instantaneous transform repositioning) without ongoing spline rendering or UI canvas redraws.
* **Trade-offs [Verified]:** Players must look in the general forward hemisphere to catch the visual flash; players who miss the cue must wait for the next 30-second cycle.

---

### Decision 2: Flashlight as an Asymmetric Double-Edged Sword

* **Decision [Verified]:** Flashlight state (`FlashLight.cs`) directly modulates enemy perception: turning on the spotlight doubles `CreatureAI` detection range from 10m to 20m and cancels player bush-hiding, but is mandatory to freeze `SpritAI` gaze stalkers.
* **Problem [Verified]:** Standard survival horror flashlights often act as simple battery-drain chores rather than active tactical choices.
* **Alternatives Considered [Inferred]:**
  1. *Standard battery pickup management system.*
  2. *Static detection radius regardless of illumination.*
* **Why This Approach [Verified]:** Forces continuous situational assessment: navigating in total darkness keeps the apex stalker unaware, but exposes the player to ambush from weeping stalkers.
* **Player Impact [Inferred]:** Transforms every click of the `F` key into a high-stakes tactical risk/reward decision.
* **Technical Impact [Verified]:** Direct boolean/active-state coupling between `PlayerMovement.spotLight` and `CreatureAI.range`.
* **Trade-offs [Verified]:** Requires clear visual affordances so players intuitively connect getting spotted with their flashlight usage.

---

### Decision 3: Multi-Terrain Heightmap Slope Validation for Portal Placement

* **Decision [Verified]:** Procedural portal spawning scans terrain heightmap data around candidate spawn points, verifying that all neighboring grid heights within a 5m radius vary by less than 0.1 units (`PortalSpawnner.cs`).
* **Problem [Verified]:** Random coordinate selection across multi-kilometer hilly terrains causes portals to spawn on steep slopes or embedded in cliff walls, breaking gameplay interactions and player navigation.
* **Alternatives Considered [Inferred]:**
  1. *Hardcoded fixed spawn points across each terrain.*
  2. *Physics raycasting with normal-angle alignment at runtime.*
* **Why This Approach [Verified]:** Provides true procedural unpredictability while guaranteeing that spawned portal structures rest on flat, playable ground without requiring manual level-design curation for every coordinate.
* **Player Impact [Inferred]:** Prevents glitchy portal interactions and maintains high replayability through variable portal locations.
* **Technical Impact [Verified]:** Heightmap array indexing is executed in a controlled initialization coroutine (`SpawnPortalsWithDelay`), avoiding runtime frame spikes.
* **Trade-offs [Verified]:** Requires an attempt-limit cap (20 iterations) before falling back to terrain center coordinates if no flat spot is found.

---

## 7. Why Is It Fun? (The Emotional Machine)

```
                              THE WITHERWOODS EMOTION LOOP
                              
         Mechanic: Pitch darkness + Flashlight toggle + Footstep audio
                                     │
                                     ▼
         Decision: Turn on light to locate path OR stay dark to avoid beast
                                     │
                                     ▼
         Feedback: Distant twig snapping / footstep audio increases in pitch
                                     │
                                     ▼
         Tension Spike: Gaze-locked creature spotted in peripheral vision
                                     │
                                     ▼
         Resolution: Dive into bush, flashlight cut, holding breath in silence
                                     │
                                     ▼
         Reward: Hunter walks past; path to portal clear -> Mastery & Relief
```

> **[DIAGRAM PLACEHOLDER — Player emotional trajectory from tension to release]**

1. **Tension & Vulnerability:** The low ambient light and directional audio system (`FootSteps_AudioManager.cs` with pitch randomization between 0.95 and 1.05) generate constant auditory paranoia.
2. **Agency under Pressure:** Pocket dimensions test completely different cognitive skills under time constraints (spatial navigation in `MazeTimer.cs`, memory/luck in `InfiniteDoorWay.cs`, patience in `RedLightGreenLightPortal.cs`).
3. **Catharsis & Pacing:** The transition from vulnerable forest stealth to empowered boss combat (`LastLevel.unity`) provides a satisfying gameplay crescendo.

---

## 8. Design vs. Engineering Breakdown

| System / Subsystem | Gameplay Design Goal | Technical Representation | Engineering Constraints & Solutions |
| :--- | :--- | :--- | :--- |
| **Stealth & Bushes** | Allow players to evade pursuit by breaking sightlines in thickets. | Trigger collider tagged `"Bush"` setting `isHieding = true`, forcing AI destination jitter. | *Constraint:* AI would path directly to player if position updated continuously.<br>*Solution:* Location updater halted when `isHieding` is active (`CreatureAI.cs:L47-49`). |
| **Weeping Angel AI** | Create panic when looking away from silent stalking spirits. | Vector dot product calculation between player forward vector and AI position (`dot > 0.5f`). | *Constraint:* Must stop both agent locomotion and animation instantaneously.<br>*Solution:* `agent.ResetPath()` + `agent.velocity = Vector3.zero` + `anim.speed = 0` (`SpritAI.cs:L45-50`). |
| **Multi-Terrain Performance** | Maintain large forest scale without dropping below target framerates. | Custom distance-based terrain culling script (`Culling.cs`) with 355m radius. | *Constraint:* Multiple high-resolution terrain tiles with grass details bottleneck GPU.<br>*Solution:* Dynamically toggles `terrain.enabled`, `TerrainCollider`, and child objects. |
| **Boss Shield & Phase Flow** | Multi-stage boss fight requiring territorial control and tactical shooting. | Shield deactivation via 3-second hold interaction (`BreakProtection.cs`), spawning energy zones. | *Constraint:* Boss needs distinct phases without separate complex scene setups.<br>*Solution:* State triggered on damage thresholds (`ke.totalhealth - ke.health >= 10`) in `LinearStory2.cs`. |

---

# SECTION 03 — HOW

```
                           SYSTEM ARCHITECTURE MAP
                           
                        ┌────────────────────────┐
                        │     Game / Scene Loop  │
                        └───────────┬────────────┘
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
┌───────────────┐           ┌───────────────┐           ┌─────────────────┐
│ Player System │           │ World System  │           │ AI & Spawners   │
├───────────────┤           ├───────────────┤           ├─────────────────┤
│• PlayerMove   │           │• PortalSpawner│           │• CreatureAI     │
│• MouseLook    │           │• TeleportMgr  │           │• SpritAI        │
│• Inventory    │           │• Thundering   │           │• EnemySpawner   │
│• FlashLight   │           │• MultiCulling │           │• Stunnable/Kill │
│• ShootMech    │           │• MazeTimer    │           │• FootStepsAudio │
└───────┬───────┘           └───────┬───────┘           └────────┬────────┘
        │                           │                            │
        └───────────────────────────┼────────────────────────────┘
                                    │
                                    ▼
                        ┌───────────────────────┐
                        │ UI & Settings Backend │
                        ├───────────────────────┤
                        │• PauseMenu (JSON IO)  │
                        │• Audio & Video Scaler │
                        │• Survival/Maze Timers │
                        └───────────────────────┘
```

> **[DIAGRAM PLACEHOLDER — Complete runtime architecture and inter-script communication graph]**

---

## 9. System Architecture

The architecture of *WitherWoods* is structured around modular, scene-contextual gameplay loops governed by decoupled controller scripts:
* **Locomotion & Interaction Pipeline:** Built on Unity's `CharacterController` with gravity simulation, custom physics sphere ground checking, and animation event synchronization.
* **Spatial Transformation & Teleportation Framework:** Decouples coordinate jumps across disconnected scene zones by disabling `CharacterController` prior to positional translation (`TeleportPlayer.cs`), preventing physics engine jitter and tunneling.
* **Diegetic Navigation & Lighting Framework:** Calculates real-time 3D vector directions between player coordinates and active portal positions, projecting temporary spotlights and particle surges.
* **State Persistence Layer:** File-based JSON serialization (`SettingsData`) that interfaces with Unity URP camera configurations and quality settings.

---

## 10. Codebase Structure

| Functional Area | Core Responsibility | Key Files / Classes | Primary Dependencies | Architectural Pattern |
| :--- | :--- | :--- | :--- | :--- |
| **Player Controller** | Locomotion, camera orientation, flashlight state, and bush hiding. | `PlayerMovement.cs`<br>`MouseLook.cs`<br>`FlashLight.cs` | `CharacterController`<br>`Animator`<br>`Camera` | Component Controller |
| **Inventory & Interaction** | Item pickup, holding sockets, and relic transport. | `PlayerInventory.cs`<br>`DropItems.cs` | `Animator`<br>`AudioSource`<br>`Camera` | State-Driven Inventory Model |
| **Enemy AI & Perception** | Patrol, sniffing, gaze-detection stalker, and proximity audio. | `CreatureAI.cs`<br>`SpritAI.cs`<br>`FootSteps_AudioManagerdio.cs` | `NavMeshAgent`<br>`Animator`<br>`AudioSource` | Polymorphic Finite State Agent |
| **World & Portals** | Dynamic portal generation, terrain flatness check, and teleportation. | `PortalSpawnner.cs`<br>`TeleportPlayer.cs`<br>`ActivatePortal.cs`<br>`ActivateMainPortal.cs` | `TerrainData`<br>`CharacterController` | Procedural Coordinator / Manager |
| **Diegetic Guidance** | Directional lightning flash, particle orientation, and 3D compass. | `Thundering.cs`<br>`ThunderingManager.cs`<br>`PortalCompass.cs` | `Transform`<br>`AudioSource`<br>`RectTransform` | Diegetic Spatial Service |
| **Combat & Boss Systems** | Raycast/Physics shooting, projectile collisions, and boss barrier phases. | `Shooting_Mechanics.cs`<br>`Projectile.cs`<br>`KillableEnemy.cs`<br>`DeActivateShield.cs` | `Rigidbody`<br>`Collider`<br>`Image` (Fill) | Event / Collision Pipeline |
| **Performance & Tools** | Distance-based terrain culling and editor detail cleaning tools. | `Culling.cs`<br>`TerrainDetailCleaner.cs`<br>`VisualSettings.cs` | `Terrain`<br>`TerrainData` | Spatial Partitioning / Editor Script |
| **Settings & Save System** | Graphic/Audio options persistence and cheat buffer parsing. | `PauseMenu.cs`<br>`SettingsData` | `JsonUtility`<br>`UniversalAdditionalCameraData` | Data Transfer Object (DTO) / IO |

---

## 11. Major System Deep Dives

### Deep Dive 1: Diegetic Directional Lightning & Spatial Guidance System

#### What
An environmental navigation system (`Thundering.cs`, `ThunderingManager.cs`) that periodically calculates the vector between the player and their active destination portal. When the player is more than 20 meters away, the system projects a directional spotlight and particle flash 18 meters ahead of the player facing toward them, synchronized with spatial thunder audio.

#### Why
Traditional horror games often break immersion by overlaying floating 3D waypoints or 2D radar screens. In a dense, dark forest where visibility is low, players require guidance without breaking the feeling of isolation. The lightning flash provides an organic, atmospheric pulse of information that rewards observant players.

#### How (Implementation Architecture)
* **Files:** `Assets/Script/Thundering.cs`, `Assets/Script/ThunderingManager.cs`
* **Class:** `Thundering`
* **Method:** `PositionSpotlight()`

```csharp
// Excerpt from Thundering.cs
void PositionSpotlight()
{
    if (player == null || portal == null || spotlight == null) return;

    // Calculate normalized direction vector from player to objective portal
    Vector3 direction = (portal.position - player.position).normalized;

    // Position spotlight and particle emitters 18 units ahead along that vector
    spotlight.transform.position = player.position + (direction * 18f);
    particles.transform.position = player.position + (direction * 18f);

    // Orient spotlight to face back toward the player for maximum visual clarity
    spotlight.transform.LookAt(player.position);
    particles.transform.LookAt(player.position);

    spotlight.SetActive(true);
}
```

> **Potential Devlog:**
> *“Designing Atmospheric Diegetic Navigation: Guiding Players Through Darkness with Directional Lightning”*

---

### Deep Dive 2: Multi-Terrain Flatness-Checked Portal Spawner

#### What
An intelligent procedural spawning pipeline (`PortalSpawnner.cs`) that distributes interactive dimensional portals across multiple terrain tiles while avoiding steep cliffs, ensuring distance separation from the player, and periodically relocating portals over time.

#### Why
Randomly choosing coordinates across multi-kilometer mountainous terrains causes portals to spawn mid-air, embedded inside hillsides, or directly on top of the player. The portal spawner uses localized heightmap slope sampling to validate flat terrain placement.

#### How (Implementation Architecture)
* **File:** `Assets/Script/PortalSpawnner.cs`
* **Class:** `PortalSpawner`
* **Key Methods:** `GetFlatPosition()`, `IsAreaFlatEnough()`

```csharp
// Excerpt from PortalSpawnner.cs
bool IsAreaFlatEnough(TerrainData data, float x, float z, float radius)
{
    float centerHeight = data.GetHeight((int)x, (int)z);
    for (float dx = -radius; dx <= radius; dx += 2f)
    {
        for (float dz = -radius; dz <= radius; dz += 2f)
        {
            float checkX = Mathf.Clamp(x + dx, 0, data.heightmapResolution - 1);
            float checkZ = Mathf.Clamp(z + dz, 0, data.heightmapResolution - 1);
            float h = data.GetHeight((int)checkX, (int)checkZ);

            // Reject coordinates with elevation variance > 0.1 units
            if (Mathf.Abs(h - centerHeight) > 0.1f)
                return false;
        }
    }
    return true;
}
```

> **Potential Devlog:**
> *“Procedural Object Placement Across Multi-Tile Heightmaps: Avoiding Cliff Glitches”*

---

### Deep Dive 3: Perception-Driven Sensory AI (Patrol, Sniff, Hunt, & Gaze)

#### What
A multi-layered AI state system spanning two distinct enemy archetypes:
1. `CreatureAI`: Stealth-hunting apex predator with sniffing pauses, light-dependent vision, and footstep proximity triggering.
2. `SpritAI`: Gaze-locked entity using camera view frustum dot products to freeze when illuminated.

#### How (Implementation Architecture)
* **Files:** `Assets/Script/CreatureAI.cs`, `Assets/Script/SpritAI.cs`

```csharp
// Excerpt from SpritAI.cs - Dot Product Gaze Calculation
bool IsPlayerLookingAtMe()
{
    Vector3 directionToAI = (transform.position - player.position).normalized;
    Vector3 playerForward = player.forward.normalized;

    float dot = Vector3.Dot(playerForward, directionToAI);

    // AI is in player view cone if dot product > 0.5 and vertical alignment matches
    return dot > 0.5f && Mathf.Abs(directionToAI.y - playerForward.y) < 0.5f;
}
```

```csharp
// Excerpt from CreatureAI.cs - Dynamic Sensor Radius
if (spotLight.activeSelf)
{
    range = 20; // Flashlight active: vision expands
    mp.isHieding = false; // Flashlight invalidates bush hiding
}
else
{
    range = 10; // Darkness: constrained vision
}
```

> **Potential Devlog:**
> *“Engineering Asymmetric Horror AI: Combining Stealth, Vision Cones, and Weeping Angel Mechanics”*

---

## 12. Runtime Flows

### Flow A: Flashlight Toggle & AI Sensory Reaction

```
Player Presses 'F'
       │
       ▼
FlashLight.cs Update()
       │
       ├── Set UI Alpha Feedback (0.05f <-> 1.0f)
       ├── Toggle SpotLight GameObject Active State
       └── Trigger Animator ("holdLight")
       │
       ▼
CreatureAI.cs Update()
       │
       ├── Reads spotLight.activeSelf
       ├── Sets Detection Range (10m -> 20m)
       └── Invalidates Bush Concealment (isHieding = false)
       │
       ▼
SpritAI.cs Update()
       │
       ├── Evaluates (!IsPlayerLookingAtMe() || !FlashLight.activeSelf)
       └── If True: Unfreezes NavMeshAgent (Speed = 1, Chase Player)
           If False: agent.ResetPath() & agent.velocity = Vector3.zero
```

> **[SEQUENCE DIAGRAM PLACEHOLDER — Flashlight activation propagation sequence]**

---

### Flow B: Inter-Dimensional Teleportation Sequence

```
Player Enters Portal Trigger
       │
       ▼
TeleportPlayer.cs OnTriggerEnter()
       │
       ├── StartCoroutine(TeleportWithDelay)
       ├── Disable CharacterController (Prevent physics conflicts)
       ├── Relocate Player Transform to SpawnPoint (e.g., "MazeSpawnPoint")
       │
       ├── Context-Specific State Triggers:
       │     ├─ If "ForestSpawnPoint": Re-enable lightning, grant Crystal1, stop MazeTimer
       │     ├─ If "MazeSpawnPoint": Start 100s MazeTimer, disable lightning
       │     └─ If "DoorwaySpawnPoint": Shuffle doorway target portals
       │
       ├── Yield WaitForSeconds(0.1f)
       └── Re-enable CharacterController & Resume PlayerMovement
```

---

### Flow C: Boss Damage & Shield Overload Pipeline

```
Player Fires Weapon ("Fire1" in Shooting_Mechanics.cs)
       │
       ▼
Raycast from Viewport Center (0.5, 0.5) -> Target Direction Calculated
       │
       ├── Ammo Decremented (-10)
       ├── Instantiates Projectile Prefab with Velocity
       │
       ▼
Projectile Hits Boss (OnCollisionEnter in Projectile.cs)
       │
       ├── Queries TryGetComponent<Enemy>(out Enemy enemy)
       ├── Calls enemy.ReactToHit(damage) -> KillableEnemy.cs reduces health
       ├── Instantiates Impact Explosion & Destroys Projectile
       │
       ▼
LinearStory2.cs Evaluates Damage Threshold
       │
       └── When (-health + totalhealth >= 10):
             ├── Enables EnemySpawnner (Spawns minion waves)
             ├── Activates Invulnerable Shield over Boss
             └── DeActivateShield.cs requires 3s Hold Interaction to disrupt
```

---

## 13. Data Flow Architecture

```
┌─────────────────────────┐       JSON Serialization       ┌────────────────────────┐
│  Player Settings Input  │ ─────────────────────────────> │  settings.json (Disk)  │
│  (Shadows, AA, Tex, Res)│                                │  (persistentDataPath)  │
└─────────────────────────┘                                └───────────┬────────────┘
             │                                                         │
             ▼                                                         ▼
┌─────────────────────────┐                                ┌────────────────────────┐
│   PauseMenu.cs Runtime  │ <───────────────────────────── │  LoadSettings() Init   │
│   Event Handlers        │                                └────────────────────────┘
└────────────┬────────────┘
             │
             ├──> UniversalAdditionalCameraData (AntialiasingMode)
             ├──> QualitySettings (globalTextureMipmapLimit)
             ├──> Terrain[] (detailObjectDensity, grassDrawDistance)
             └──> Screen (SetResolution FullScreenMode)
```

---

## 14. State Machines

### `CreatureAI` Behavioral State Machine

```
                      ┌────────────────────────┐
                      │         PATROL         │
                      │  (Silent Walk / Walk)  │
                      └───────────┬────────────┘
                                  │
                   Player within Range (10m/20m)
                   and NOT in Bush (isHieding=false)
                                  │
                                  ▼
                      ┌────────────────────────┐
                      │          CHASE         │
                      │   (Agent Speed 6.3f)   │
                      └───────────┬────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
           Distance <= 2m               Player enters Bush
                    │                   (breaks sightline)
                    ▼                           │
        ┌───────────────────────┐               ▼
        │       JUMPSCARE       │   ┌───────────────────────┐
        │  • Lock Controller    │   │      SNIFF / SEARCH   │
        │  • Camera Reset       │   │  • Agent Speed 3.0f   │
        │  • Trigger Animation  │   │  • Jitter Destination │
        │  • Respawn at Camp    │   │  • Sniff Animation    │
        └───────────────────────┘   └───────────┬───────────┘
                                                │
                                        Search Timer Expired
                                                │
                                                ▼
                                    [Return to PATROL State]
```

> **[STATE MACHINE DIAGRAM PLACEHOLDER — Complete AI state transitions and condition nodes]**

---

## 15. Combat & Boss Pipeline

* **Input & Firing Mechanism:** Center-viewport raycasting (`Shooting_Mechanics.cs`) maps a direct trajectory from `firePoint` to world hits, launching a physics-driven projectile with impulse velocity.
* **Energy Zone Reload Mechanic:** Unlike conventional reloading with reserve clips, ammo recharges over time when standing in specific tactical zones (`zone1` grants `0.1 * dt`, `zone2` grants `2.0 * dt`), encouraging dynamic movement during boss combat.
* **Polymorphic Damage Layer:** Projectiles interact with targets via an abstract interface:
  * `Enemy.cs`: `public abstract void ReactToHit(float damage);`
  * `StunnableEnemy.cs`: Triggers timed navmesh agent paralysis (`stunTime = 3f`).
  * `KillableEnemy.cs`: Subtracts direct health points, driving UI health fill bars (`HeartHealth.cs`).

---

## 16. Performance Engineering & Optimization

### Verified Performance Techniques [Verified]
1. **Dynamic Distance Multi-Terrain Culling (`Culling.cs`):** Periodically polls player-to-terrain distance on a 1-second interval (`InvokeRepeating`), disabling renderers, terrain colliders, and child hierarchies beyond 355m.
2. **Terrain Grass Detail Optimization (`VisualSettings.cs`):** Programmatically sets `terrain.detailObjectDistance` across all active terrains, controlling pixel shader load.
3. **Editor Grass Trimming Utility (`TerrainDetailCleaner.cs`):** An editor utility (`[ExecuteInEditMode]`) that scrubs grass details below an elevation threshold of 0.8m, removing hidden, overdrawn underwater geometry.

### Potential Performance Risks & Architectural Observations [Inferred]
1. **Per-Frame `FindObjectsOfType<Terrain>()` & String GameObject Lookups:** Certain scripts utilize `GameObject.Find()` inside `Update()` loops (e.g., `TeleportPlayer.cs:Set()`, `ActivatePortal.cs:Start()`). Migrating to cached singleton references or dependency injection would eliminate unnecessary frame overhead.

---

## 17. Technical Trade-Offs

| Decision | Benefit Gained | Cost Incurred | Justification & Context |
| :--- | :--- | :--- | :--- |
| **Monolithic Character Controller** (`PlayerMovement.cs`) | Centralized management of footstep triggers, flashlight checks, animator states, and stealth flags. | High coupling between inventory, audio, and UI systems. | Acceptable for the project's scope; enables rapid iteration on core horror mechanics. |
| **Polling via `InvokeRepeating`** (`Culling.cs`, `PortalSpawnner.cs`) | Avoids frame-by-frame overhead of running heavy distance math in `Update()`. | Slower reaction time (up to 1.0s) when crossing culling boundaries. | Unnoticeable to the player given the large 355m culling distance cushion. |
| **JSON Settings Storage** (`PauseMenu.cs`) | Human-readable, easily debuggable, platform-independent configuration storage. | Unencrypted plain text file vulnerable to client modification. | Ideal for PC indie development; allows quick troubleshooting and includes a debug cheat system (`withergod`). |
| **Trigger Collider Level Transitions** (`NextLevel.cs`) | Simple and reliable scene progression without complex level streaming graphs. | Requires brief loading pause between major scene sectors. | Fits the episodic structure of the game (Prologue -> Forest Hub -> Boss Arena). |

---

## 18. Problems Solved & Technical Lessons

### Problem 1: CharacterController Teleportation Collision Tunneling
* **Problem [Verified]:** When teleporting the player across distant scene coordinates, Unity's `CharacterController` would collide with intermediate colliders or snap back to its previous position due to internal velocity caching.
* **Solution [Verified]:** Implemented a coroutine-based disable/relocate/yield/re-enable lifecycle in `TeleportPlayer.cs`:
  ```csharp
  controller.enabled = false;
  player.transform.position = spawnPoint.transform.position;
  yield return new WaitForSeconds(0.1f);
  controller.enabled = true;
  ```
* **Lesson Learned [Inferred]:** PhysX controller components must be explicitly deregistered from the physics simulation before modifying transform coordinates.

---

### Problem 2: Gaze-Stalking AI Sliding on Stopping
* **Problem [Verified]:** When the player looked at `SpritAI`, setting `agent.isStopped = true` allowed residual agent velocity to slide the enemy forward several feet, breaking the "frozen statue" illusion.
* **Solution [Verified]:** Simultaneously cleared the path, zeroed out velocity, and froze animator playback:
  ```csharp
  agent.isStopped = true;
  agent.ResetPath();
  agent.velocity = Vector3.zero;
  anim.speed = 0;
  ```
* **Lesson Learned [Inferred]:** Complete agent immobilization requires clearing both kinematic pathfinding targets and underlying rigidbody/navmesh velocity vectors.

---

## 19. Technical Debt & Professional Refactoring Roadmap

> “The current architecture successfully fulfills the project's core gameplay and atmospheric requirements. If expanding *WitherWoods* into a full commercial production, the following refactoring roadmap would be prioritized:”

1. **Event-Driven Decoupling via ScriptableObject Architecture / C# Actions:**
   * *Current State:* Direct component references and `GameObject.FindWithTag()` lookups in `Update()` and `OnTriggerEnter()`.
   * *Proposed Direction:* Introduce a global event channel architecture (e.g., `GameEvent<T>`) for flashlight toggles, player damage, and relic sockets.
   * *Benefit:* Eliminates null-reference hazards and enables true scene modularity.
2. **Centralized Audio Manager with AudioMixer Groups:**
   * *Current State:* Audio sources scattered across individual entity components with hardcoded pitch shifts.
   * *Proposed Direction:* Route all audio through a master `AudioManager` utilizing Unity `AudioMixer` with dynamic ducking, snapshot transitions, and spatial reverb zones.
   * *Benefit:* Significantly enhances soundscape fidelity and dynamic tension mixing.
3. **State Pattern Refactoring for AI Agents:**
   * *Current State:* Nested conditional checks and boolean flags in monolithic update loops.
   * *Proposed Direction:* Implement a clean Finite State Machine (FSM) or Behavior Tree structure with discrete `IState` classes (`PatrolState`, `HuntState`, `SniffState`).
   * *Benefit:* Simplifies debugging, makes adding new enemy types trivial, and removes state-flag collision bugs.

---

# SECTION 04 — CASE STUDY SCORECARD & PORTFOLIO WRAP-UP

## Case Study Scorecard

| Skill Area | Evidence Demonstrated in *WitherWoods* |
| :--- | :--- |
| **Gameplay Programming** | Built a responsive first-person controller with dual-arm animation layering, toggleable flashlight stealth mechanics, raycast projectile shooting, and context-sensitive interactions. |
| **Systems & AI Design** | Designed distinct AI behavior models (perception-radius stalker and gaze-direction quantum-locked spirit) with vision cone and flashlight sensitivity. |
| **Technical Design & Math** | Implemented vector dot product gaze detection, heightmap slope validation math, directional lightning triangulation vectors, and 3D UI needle tracking. |
| **Optimization & Engine Mastery** | Developed multi-terrain distance culling, editor-time detail grass scrubbers, and texture mipmap limits. |
| **UI & Systems Architecture** | Constructed a JSON-persisted settings pipeline interfacing with URP camera antialiasing, mipmap levels, resolution scaling, and survival timers. |

---

## Key Takeaways

### What I Built
A complete first-person psychological survival horror game featuring multi-terrain exploration, procedural pocket dimensions, dynamic stealth/pursuit AI, and multi-phase boss encounters.

### Why I Built It This Way
To merge atmospheric, diegetic horror game design with robust systems engineering—substituting artificial UI clutter with environmental feedback (lightning flashes, audio footsteps, directional needles) while maintaining tight technical control over AI pathfinding and multi-terrain performance.

### How I Built It
Built in Unity 2022.3 (URP) utilizing C#, NavMesh navigation systems, multi-terrain heightmap analysis, character controller kinematics, and JSON file serialization.

---

## Visual Index (Recommended Portfolio Assets)

| # | Visual Type | Section | Purpose / What to Show |
| :-: | :--- | :--- | :--- |
| **01** | **Hero Gameplay Screenshot** | Project Overview | Player holding the glowing crystal in the dark misty forest with flashlight beam cutting through trees. |
| **02** | **Gameplay GIF** | Core Loop | Player toggling flashlight off and crouching in a bush as a creature walks past. |
| **03** | **Architecture Diagram** | System Architecture | High-level system interaction graph showing player, world, AI, and persistence modules. |
| **04** | **Diegetic Lightning Screenshot** | Technical Deep Dive | Scene view displaying the directional lightning spotlight and particle burst pointing toward the portal. |
| **05** | **AI State Diagram** | AI Deep Dive | Visual flow of the `CreatureAI` hunting, sniffing, chasing, and jumpscare states. |
| **06** | **Sequence Diagram** | Runtime Flows | End-to-end trace of a player entering a portal, coordinate relocation, and dimension timer initialization. |
| **07** | **Combat GIF** | Combat System | Shooting energy projectiles at the corrupted Heart boss while standing in the charging zone. |

---

## Devlog Index (Ready-to-Publish Articles)

1. **Devlog #01:** *“Designing Atmospheric Diegetic Navigation: Guiding Players Through Darkness with Directional Lightning”*
2. **Devlog #02:** *“Engineering Asymmetric Horror AI: Vision Cones, Footstep Proximity, and Gaze Mechanics”*
3. **Devlog #03:** *“Building Inter-Dimensional Portals & Flatness-Checked Spawning Across Multi-Tile Heightmaps”*
4. **Devlog #04:** *“Optimizing Large-Scale Forest Environments in Unity URP: Culling, Scrubbing, and LODs”*
5. **Devlog #05:** *“Designing Multi-Phase Boss Encounters & Recharging Energy Zones in First-Person Horror”*
