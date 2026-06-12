<script lang="ts">
  import { TranslateIcon } from '@hugeicons/core-free-icons';
  import { HugeiconsIcon } from '@hugeicons/svelte';
  import { locales, type Locale } from '@boringstack/i18n/locales';
  import { Button } from '$lib/components/ui/button';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { m } from '$lib/i18n';
  import { getLocale, setLocale } from '$lib/locale.svelte';

  const currentLocale = $derived(getLocale());

  const localeLabel = (locale: Locale) => m(`locale.${locale}`);

  function selectLocale(value: string) {
    if ((locales as readonly string[]).includes(value)) {
      setLocale(value as Locale);
    }
  }
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button
        {...props}
        variant="ghost"
        size="icon"
        class="size-8"
        aria-label={m('locale.label')}
      >
        <HugeiconsIcon icon={TranslateIcon} strokeWidth={2} class="size-4" />
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end">
    <DropdownMenu.Label>{m('locale.label')}</DropdownMenu.Label>
    <DropdownMenu.RadioGroup value={currentLocale} onValueChange={selectLocale}>
      {#each locales as locale (locale)}
        <DropdownMenu.RadioItem value={locale}>
          {localeLabel(locale)}
        </DropdownMenu.RadioItem>
      {/each}
    </DropdownMenu.RadioGroup>
  </DropdownMenu.Content>
</DropdownMenu.Root>
