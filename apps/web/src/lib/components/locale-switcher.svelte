<script lang="ts">
  import { locales, type Locale } from '@boringstack/i18n/locales';
  import { getLocale, setLocale } from '$lib/locale.svelte';

  const currentLocale = $derived(getLocale());

  function onChange(event: Event) {
    const value = (event.currentTarget as HTMLSelectElement).value;

    if (locales.includes(value as Locale)) {
      setLocale(value as Locale);
    }
  }
</script>

<label class="inline-flex items-center gap-2 text-sm text-muted-foreground">
  <span class="sr-only">Language</span>
  <select
    class="rounded-lg border border-border bg-background px-2 py-1 text-foreground"
    value={currentLocale}
    onchange={onChange}
  >
    {#each locales as locale (locale)}
      <option value={locale}>{locale.toUpperCase()}</option>
    {/each}
  </select>
</label>
