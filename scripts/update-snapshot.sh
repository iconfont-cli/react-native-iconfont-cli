#!/usr/bin/env bash

rm -rf snapshots/*

cp -f ./scripts/demo.json ./svgicon.json
npx ts-node src/commands/createIcon.ts
