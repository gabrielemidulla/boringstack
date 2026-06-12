<script lang="ts">
  import { Loading03Icon } from '@hugeicons/core-free-icons';
  import { HugeiconsIcon } from '@hugeicons/svelte';
  import { m } from '$lib/i18n';
</script>

<div class="grid min-h-screen place-items-center bg-background px-4" role="status">
  <span class="sr-only">{m('common.loading')}</span>
  <HugeiconsIcon
    icon={Loading03Icon}
    strokeWidth={2}
    class="size-8 animate-spin text-muted-foreground"
    aria-hidden="true"
  />
</div>
