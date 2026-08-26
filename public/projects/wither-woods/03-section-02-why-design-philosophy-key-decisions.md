# SECTION 02 — WHY: Design Philosophy & Key Decisions

# SECTION 02 — WHY: Design Philosophy & Key Decisions

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
