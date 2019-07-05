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
  <h1 class="vf-intro__heading vf-intro__heading--has-tag">Welcome <a href="" class="vf-badge vf-badge--primary vf-badge--phases">alpha</a></h1>
  <p class="vf-lede">The Visual Frameowrk 2.0: {{ siteConfig.siteInformation.short_description | safe }}</p>

  <p class="vf-intro__text">The Visual Framework (VF) is designed with the needs of life science websites and services. It goes beyond guidance for tables, graphs, data-heavy typography and focuses on being sane defaults and implements its CSS in a way that won't interfere with your existing components that use Bootstrap, Angular, or something else.</p>

</div>
</section>


<section class="vf-content | embl-grid embl-grid--has-centered-content">
<div>

#### ⏰ When will this be ready?

</div>
<div>

- This is a v2.0 that was imagined in 2017 and development began in the summer of 2018
- As of July 2019 we're on [alpha.7](https://github.com/visual-framework/vf-core/releases)
- Expect a beta in summer 2019

As the Visual Framework is in heavy, active development, we will have many `v2.0.0-alpha.X` releases. With new alphas planned on a monthly basis (last Thursday of each month).

Watch the [releases](https://github.com/visual-framework/vf-core/releases) and let us know your feedback: [issues](https://github.com/visual-framework/vf-core/issues) or [email](mailto:ken.hawkins@embl.de).

</div>
</section>

<section class="vf-content | embl-grid embl-grid--has-centered-content">
<div>

#### 🤔 Why a VF?

</div>
<div>


The Visual Framework address three major needs:

1. ⚗️🌳 Life sciences: We address common needs for [life science websites](https://www.ebi.ac.uk/services). The Visual Framework can be easily tailored to niche needs, but out of the box it's pleasant looking, but dry and serious to support focus, clarity and data.
1. 🏰 Share only what you need to: the Visual Framework is designed to work with other frameworks (both CSS, like Bootstrap, and JS, like React or Angular). This allows common components (and brand design) to be shared between sites without cross-contaminating into another framework. We mainly achieve this by:
   - Name spacing all selectors for CSS or JS (`vf-*`)
   - No CSS styling on HTML elements. We only attached to name spaced classes, that is:
      - ✅ `.vf-button {}`
      - 🚫 `.button {}`
      - 🚫 `button {}`
      - 🚫🙊🙉 `div.button {}`
   - 🖕 This necessarily requires a bit more class writing, but it ensures the Visual Framework won't break existing code.
   - BYOJS: Bring your own JavaScript. We've included only a minimal amount of JS in components and it's fully optional (just remove [the JavaScript selectors](https://github.com/visual-framework/vf-core/issues/115#issuecomment-455524131); i.e. `data-vf-js-tabs`). So if you'd rather use Angular or Bootstrap for your tabs, the Visual Framework won't get in the way.
1. 🧩 Use just what you need:
   - The `vf-core` can be included an npm install to build your CSS, JS dynamically based on the components you need; [see the vf-eleventy boilerplate for an example](https://github.com/visual-framework/vf-eleventy)
   - Or just npm install specific components to make your design system and site [demonstration to come]

</div>
</section>

<section class="vf-content | embl-grid embl-grid--has-centered-content">
<div>

#### 🚧 ✍ Developing, contributing

</div>
<div>

Want to make your own design system or component?

- <a id="developing"></a> [Getting started]({{ '/documentation#getting-started' | url }})
- [Contributing components]({{ '/documentation#components' | url }})
- [General guidelines, best practice]({{ '/documentation#guidelines' | url }})

#### Local development

To use the Visual Framework your machine will require some software to be installed to start. [See the "Setting up" guide](https://github.com/visual-framework/vf-core/blob/develop/docs/contributing/setting-up.njk).

</div>
</section>
