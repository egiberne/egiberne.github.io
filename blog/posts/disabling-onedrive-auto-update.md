---
title : Disable OneDrive Autoupdate
layout: doc
lastUpdated: true
---

# Disable OneDrive Autoupdate

[[toc]]

## Understanding OneDrive Auto‑Update

OneDrive includes a built‑in auto‑update mechanism that keeps the sync client current. By default, it checks for updates regularly and installs them silently in the background. This ensures users always have the latest features, bug fixes, and security improvements.

However, in some environments like especially large enterprises or tightly controlled workstations, you may want to pause or disable this behavior.

## Reasons to Disable Auto‑Update

There are several valid operational reasons to turn off OneDrive auto‑updates:

- Change management : Some organizations need to validate new versions in a lab before rolling them out.

- Compatibility concerns : New builds may introduce changes that affect legacy applications, custom integrations, or specific workflows.

- Stability period : When working for instance during the tax season freezing the OneDrive, Office and OS version avoid unexpected behavior.

- Bandwidth management : Auto‑updates can trigger downloads across thousands of devices at once.

- Strict security or compliance policies : Some environments require updates to be deployed only through internal tools like SCCM, Intune, or WSUS.

Disabling auto‑update gives IT full control over when and how new versions are introduced.

## Methods to Disable OneDrive Auto‑Update

There are multiple ways to stop OneDrive from updating automatically. See below the method that fits your environment.

### Using Group Policy Object

This is the recommended for Enterprises.

Microsoft does not provide a policy object to prevent OneDrive from automatically updating. However, there is a group policy called "Delay updating OneDrive.exe until the second release wave." This setting prevents OneDrive sync clients from being updated until the second wave, giving some extra time to prepare for upcoming updates.

- Setting: Delay updating OneDrive.exe until the second release wave

- Path: User Configuration\Administrative Templates\OneDrive\

- Effect: This setting prevents OneDrive sync clients from being updated until the second wave. This gives you some extra time to prepare for upcoming updates

This is the cleanest and most supportable method for domain‑joined Windows devices.

### Using the Registry

You can disable auto‑update by creating the following registry value:

`[HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\OneDrive]
"EnableEnterpriseUpdate"=dword:00000001`

This is useful for:

- Deploying through group policy preference or GPP

- Applying via a PowerShell scripts

- Configuring during the build image process

### Blocking Update URLs

This approach in not recommended unless necessary. Some admins block OneDrive update endpoints at the firewall. This method works but can cause unexpected behavior and is harder to maintain. The Microsoft support might refuse to proceed with further investigation whether this is in place.

Here are the URLs

- oneclient.sfx.ms

- g.live.com

### Turning off the task and service

If you prefer to push configuration via configuration manage like SCCM or MDM:

1. Disable the scheduled task named, **OneDrive Per-Machine Standalone Update Task** using PowerShell

``` powershell

Get-ScheduledTask | where { $_.Taskname -like "*onedrive*"} | Stop-ScheduledTask
Get-ScheduledTask | where { $_.Taskname -like "*onedrive*"} | Disable-ScheduledTask

```

2. Stop the Windows service called, **OneDrive Updater Service**

``` powershell
Get-Service | select -Property Displayname | where { $_ -like "*onedrive*"} | Stop-Service
```


This gives you more control over timing and versioning.

## Final Thoughts

Disabling OneDrive auto‑update is a valid strategy when stability, compliance, or controlled rollout is a priority. The key is to pair it with a structured update process so your environment stays secure and predictable.