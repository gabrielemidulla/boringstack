<script lang="ts">
  import { onMount } from 'svelte';
  import { toast } from 'svelte-sonner';
  import { TranslateIcon } from '@hugeicons/core-free-icons';
  import { HugeiconsIcon } from '@hugeicons/svelte';
  import {
    siDocker,
    siDrizzle,
    siMariadb,
    siNestjs,
    siPnpm,
    siShadcnui,
    siSvelte,
    type SimpleIcon,
  } from 'simple-icons';
  import { api, connection } from '$lib/api';
  import BrandIcon from '$lib/components/brand-icon.svelte';
  import HomeNavbar from '$lib/components/home-navbar.svelte';
  import { error as tError, m } from '$lib/i18n';

  async function checkHealth() {
    try {
      const health = await api.functional.api.v1.health.check(connection);

      if (health.status !== 'ok') {
        toast.error(tError('app.internal'));
      }
    } catch {
      toast.error(tError('app.internal'));
    }
  }

  onMount(() => {
    void checkHealth();
  });

  type StackItem = {
    name: string;
    color: string;
    icon?: SimpleIcon;
    hugeIcon?: typeof TranslateIcon;
    svg?: { viewBox: string; path: string };
  };

  const betterAuthLogoPath =
    'M200 0h200v300H200V200h100V100H200zM0 0h100v100h100v100H100v100H0z';

  const stack: StackItem[] = [
    { name: 'Docker', color: '#2396ec', icon: siDocker },
    { name: 'MariaDB', color: '#003545', icon: siMariadb },
    { name: 'pnpm', color: '#f59220', icon: siPnpm },
    { name: 'Svelte', color: '#ff3e00', icon: siSvelte },
    { name: 'shadcn', color: '#000000', icon: siShadcnui },
    { name: 'NestJS', color: '#e0234e', icon: siNestjs },
    {
      name: 'Better-Auth',
      color: '#000000',
      svg: { viewBox: '0 0 400 300', path: betterAuthLogoPath },
    },
    { name: 'Drizzle', color: '#9fce32', icon: siDrizzle },
    { name: 'i18n', color: '#7986cb', hugeIcon: TranslateIcon },
  ];
</script>

<svelte:head>
  <title>{m('app.title')}</title>
</svelte:head>

<HomeNavbar />

<main class="flex min-h-screen flex-col items-center justify-center px-5 py-12">
  <div class="text-center">
    <h1 class="text-6xl font-semibold tracking-tight text-balance sm:text-8xl">
      {m('app.title')}
    </h1>
    <p class="mt-4 text-lg text-muted-foreground sm:text-xl">
      {m('app.badge')}
    </p>
  </div>

  <div class="mt-14 flex flex-wrap justify-center">
    {#each stack as item (item.name)}
      <div
        class="flex w-fit items-center gap-2.5 px-4 py-3 text-sm font-normal text-white"
        style:background-color={item.color}
      >
        {#if item.icon}
          <BrandIcon icon={item.icon} color="#ffffff" class="size-5 shrink-0" />
        {:else if item.svg}
          <svg
            viewBox={item.svg.viewBox}
            fill="currentColor"
            class="size-5 shrink-0 text-white"
            aria-hidden="true"
          >
            <path d={item.svg.path} />
          </svg>
        {:else if item.hugeIcon}
          <HugeiconsIcon
            icon={item.hugeIcon}
            strokeWidth={2}
            class="size-5 shrink-0 text-white"
          />
        {/if}
        <span>{item.name}</span>
      </div>
    {/each}
  </div>
</main>
