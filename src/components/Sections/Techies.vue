<script setup lang="ts">
import { isDark } from "~/utils"
import AWSLight from "/images/techies/amazon-web-services-light.svg?component"
import AWSDark from "/images/techies/amazon-web-services-dark.svg?component"
import Couchbase from "/images/techies/couchbase.svg?component"
import Docker from "/images/techies/docker.svg?component"
import Git from "/images/techies/git.svg?component"
import Golang from "/images/techies/golang.svg?component"
import GraphQL from "/images/techies/graphql.svg?component"
import K8S from "/images/techies/k8s.svg?component"
import MongoDB from "/images/techies/mongodb.svg?component"
import MySQL from "/images/techies/mysql.svg?component"
import NodeJS from "/images/techies/node.svg?component"
import PostgreSQL from "/images/techies/postgresql.svg?component"
import Redis from "/images/techies/redis.svg?component"
import TypeScript from "/images/techies/typescript.svg?component"
import CleanArchs from "/images/techies/clean-architecture.svg?component"
import { TechiesList } from "~/types"

const techies: TechiesList[] = [
  {
    name: "go",
    light: Golang,
  },
  {
    name: "arquitecturas-limpias",
    light: CleanArchs,
  },
  {
    name: "nodejs",
    light: NodeJS,
  },
  {
    name: "typescript",
    light: TypeScript,
  },
  {
    name: "aws",
    light: AWSLight,
    dark: AWSDark,
  },
  {
    name: "kubernetes",
    light: K8S,
  },
  {
    name: "docker",
    light: Docker,
  },
  {
    name: "git",
    light: Git,
  },
  {
    name: "mongodb",
    light: MongoDB,
  },
  {
    name: "mysql",
    light: MySQL,
  },
  {
    name: "postgresql",
    light: PostgreSQL,
  },
  {
    name: "graphql",
    light: GraphQL,
  },
  {
    name: "redis",
    light: Redis,
  },
  {
    name: "couchbase",
    light: Couchbase,
  },
]
</script>

<template>
  <div class="techies animate-fade-in animate-duration-1000">
    <router-link
      v-for="(data, i) in techies"
      :key="i"
      class="zoom-in"
      :to="'/tags/' + data.name"
      active-class=""
    >
      <component :is="isDark && data.dark ? data.dark : data.light" loading="lazy"></component>
    </router-link>
  </div>
</template>

<style lang="scss">
.techies {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  @apply flex h-18 relative overflow-auto items-center;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.techies::-webkit-scrollbar {
  display: none;
}

.techies > a {
  @apply flex w-12 h-12 mr-3 ml-3 first:ml-0;
}

.zoom-in:hover {
  transform: scale(var(--scale-rate));
  transition-duration: 0.25s;
}

.zoom-in {
  transform: scale(1);
  transition-duration: 0.25s;
}
</style>
