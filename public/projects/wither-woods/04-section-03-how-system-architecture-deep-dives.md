# SECTION 03 — HOW: System Architecture & Deep Dives

# SECTION 03 — HOW: System Architecture & Deep Dives

# SECTION 03 — HOW: System Architecture & Deep Dives

# SECTION 03 — HOW: System Architecture & Deep Dives

# SECTION 03 — HOW: System Architecture & Deep Dives

# SECTION 03 — HOW: System Architecture & Deep Dives

# SECTION 03 — HOW: System Architecture & Deep Dives

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
