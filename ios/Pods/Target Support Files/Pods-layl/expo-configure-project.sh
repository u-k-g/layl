#!/usr/bin/env bash
# @generated by expo-modules-autolinking

set -eo pipefail

function with_node() {
  # Start with a default
  export NODE_BINARY=$(command -v node)

  # Override the default with the global environment
  ENV_PATH="$PODS_ROOT/../.xcode.env"
  if [[ -f "$ENV_PATH" ]]; then
    source "$ENV_PATH"
  fi

  # Override the global with the local environment
  LOCAL_ENV_PATH="${ENV_PATH}.local"
  if [[ -f "$LOCAL_ENV_PATH" ]]; then
    source "$LOCAL_ENV_PATH"
  fi

  if [[ -n "$NODE_BINARY" && -x "$NODE_BINARY" ]]; then
    echo "Node found at: ${NODE_BINARY}"
  else
    cat >&2 << NODE_NOT_FOUND
error: Could not find "node" executable while running an Xcode build script.
You need to specify the path to your Node.js executable by defining an environment variable named NODE_BINARY in your project's .xcode.env or .xcode.env.local file.
You can set this up quickly by running:

echo "export NODE_BINARY=\$(command -v node)" >> .xcode.env

in the ios folder of your project.
NODE_NOT_FOUND

    exit 1
  fi

  # Execute argument, if present
  if [[ "$#" -gt 0 ]]; then
    "$NODE_BINARY" "$@"
  fi
}

with_node \
  --no-warnings \
  --eval "require(require.resolve('expo-modules-autolinking', { paths: [require.resolve('expo/package.json')] }))(process.argv.slice(1))" \
  generate-modules-provider  \
  --target "/Users/uzair/01-dev/layl/ios/Pods/Target Support Files/Pods-layl/ExpoModulesProvider.swift" \
  --entitlement "/Users/uzair/01-dev/layl/ios/layl/layl.entitlements" \
  --platform "apple" \
  --packages "expo" "expo-asset" "expo-blur" "expo-constants" "expo-dev-launcher" "expo-dev-menu" "expo-file-system" "expo-font" "expo-haptics" "expo-keep-awake" "expo-linear-gradient" "expo-linking" "expo-router" "expo-splash-screen" "expo-symbols" "expo-system-ui" "expo-web-browser"
