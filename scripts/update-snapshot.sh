#!/usr/bin/env bash

cp -f ./scripts/config/all-in-one-js.json ./iconfont.json
npx ts-node src/commands/createIcon.ts

cp -f ./scripts/config/all-in-one-ts.json ./iconfont.json
npx ts-node src/commands/createIcon.ts

cp -f ./scripts/config/depends-on-js.json ./iconfont.json
npx ts-node src/commands/createIcon.ts

cp -f ./scripts/config/depends-on-ts.json ./iconfont.json
npx ts-node src/commands/createIcon.ts
