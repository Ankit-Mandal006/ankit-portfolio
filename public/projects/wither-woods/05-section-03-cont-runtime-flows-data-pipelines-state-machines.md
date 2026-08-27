# SECTION 03 (Cont.) — Runtime Flows, Data Pipelines & State Machines

# SECTION 03 (Cont.) — Runtime Flows, Data Pipelines & State Machines

# SECTION 03 (Cont.) — Runtime Flows, Data Pipelines & State Machines

# SECTION 03 (Cont.) — Runtime Flows, Data Pipelines & State Machines

# SECTION 03 (Cont.) — Runtime Flows, Data Pipelines & State Machines

# SECTION 03 (Cont.) — Runtime Flows, Data Pipelines & State Machines

# SECTION 03 (Cont.) — Runtime Flows, Data Pipelines & State Machines

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
