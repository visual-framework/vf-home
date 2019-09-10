---
subtitle: No homepage, yet.
date: 2018-08-22 12:24:50
layout: layouts/base.njk
---

<section class="vf-intro | embl-grid embl-grid--has-centered-content">
<div>
  <!-- empty -->
</div>
<div>
  <h1 class="vf-intro__heading vf-intro__heading--has-tag">Welcome to the VF <a href="#" class="vf-badge vf-badge--primary vf-badge--phases">beta</a></h1>
  <p class="vf-lede">The Visual Frameowrk 2.0: {{ siteConfig.siteInformation.short_description | safe }}</p>

  <p class="vf-intro__text">The Visual Framework (VF) is designed with the <a href="https://blogs.embl.org/communications/2018/09/12/faster-scientific-websites-through-reusability" class="vf-link">needs of life science websites and services</a>. It goes beyond guidance for tables, graphs, data-heavy typography and focuses on being sane defaults and implements its CSS in a way that won't interfere with your existing components that use Bootstrap, Angular, or something else.</p>

</div>
</section>


<section class="vf-content | embl-grid embl-grid--has-centered-content">
<div></div>
<div>

## Tailored for life science websites

<!-- This content is styled using the .vf-content component, intended for use
     where the application of classnames is difficult, such as Markdown text
     or WYSIWYG editors -->

The Visual Framework address three major needs:

1. **Clarity**<br/>
highly customisable but out of the box a pleasant look that is dry to focus on clarity and data.

1. **Compatibility**<br/>
designed to work with other frameworks (both CSS, like Bootstrap, and JS, like React or Angular). This allows common components (and brand design) to be shared between sites without cross-contaminating into another framework. We mainly achieve this by:
    - No CSS styling on HTML elements. We only attached to name spaced classes, that is:
      - `.button {}` 🚫
      - `button {}` 🚫🚫
      - `div.button {}` 🚫🚫🚫
      - `.vf-button {}` ✅ 💯
    - BYOJS: Bring your own JavaScript. We've included only a minimal amount of JS in components and it's fully optional (just remove [the JavaScript selectors](https://github.com/visual-framework/vf-core/issues/115#issuecomment-455524131); i.e. `data-vf-js-tabs`). So if you'd rather use Angular or Bootstrap for your tabs, the Visual Framework won't get in the way.

1. **Componentisation**<br/>
  Use only the portions you need.<br/>
  Use `vf-core` to build your CSS, JS dynamically based on the components you need, or bring your own build system

</div>
</section>

<section class="vf-content | embl-grid embl-grid--has-centered-content">
<div></div>
<div>

## Building a VF-powered system

- [See the building guide]({{ '/building' | url }})

</div>
</section>


<section class="vf-content | embl-grid embl-grid--has-centered-content">
<div></div>
<div>

## Developing, contributing

Want to make your own design system or component?

- <a id="developing"></a> [Getting started]({{ '/developing#getting-started' | url }})
- [Contributing components]({{ '/developing#components' | url }})
- [General guidelines, best practice]({{ '/developing#guidelines' | url }})

</div>
</section>


<section class="vf-content | embl-grid embl-grid--has-centered-content">
<div></div>
<div>

## FAQ

### Is VF Core just a Bootstrap with a different theme?

No. VF Core is an architecture to build extensible components that contain CSS/Sass, JS, Nunjuck templates, and image assets. You could use the VF Core to make a Bootstrap-style framework.   

### I’m a small research team, should I use VF Core?

Yes, utilise the Visual Framework system with one of the above listed approaches.

### Does it have a specific look and feel?

No. It has a default look out of the box, but it is fully customisable by altering the [Design Tokens](https://github.com/visual-framework/vf-core/tree/develop/components/vf-design-tokens/src).

### Is it really ready for use today?

Stable for your non-production development. We're in a beta phase and things are still subject to change, but there should be few breaking changes and we'll offer guidance on updating between betas.

### Shouldn’t I just use Bootstrap or Solution X?

No, but yes … do both.

This question is more about the general approach of the Visual Framework architecture, but the VF Core is designed to address common issues with component portability in the life science space …
and use bootstrap too

## What’s next

Efforts in the next few months will be extending and stabilising the above projects and further stabilising [`vf-core`](#link-to-beta.2-issues).

</div>
</section>
