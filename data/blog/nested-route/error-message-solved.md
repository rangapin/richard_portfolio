---
title: List of error message I faced and solved
date: '2022-12-30'
tags: ['error', 'message', 'google']
draft: false
summary: This is a list of error message I faced and solved
---

## libpcre3-dev : Depends: libpcre3 (= 2:8.39-13ubuntu0.22.04.1) but 2:8.44-2+ubuntu20.10.1+deb.sury.org+1 is to be installed E: Unable to correct problems, you have held broken packages.

Thank you Github! I solved this issue by downgrading the package using the command.

```
sudo apt-get install libpcre3=2:8.39-13ubuntu0.22.04.1
```

## TBC
