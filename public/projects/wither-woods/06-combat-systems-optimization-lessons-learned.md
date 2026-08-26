# Combat Systems, Optimization & Lessons Learned

# Combat Systems, Optimization & Lessons Learned

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
