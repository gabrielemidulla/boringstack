<script lang="ts">
  import type { SimpleIcon } from 'simple-icons';

  type BrandIconProps = {
    icon: SimpleIcon;
    class?: string;
    color?: string;
    title?: string;
    decorative?: boolean;
  };

  let {
    icon,
    class: className = 'size-4',
    color,
    title = icon.title,
    decorative = true,
  }: BrandIconProps = $props();
</script>

<svg
  class={className}
  role={decorative ? undefined : 'img'}
  aria-hidden={decorative}
  aria-label={decorative ? undefined : title}
  viewBox="0 0 24 24"
  fill="currentColor"
  style:color={color ?? `#${icon.hex}`}
>
  {#if !decorative}
    <title>{title}</title>
  {/if}
  <path d={icon.path} />
</svg>
