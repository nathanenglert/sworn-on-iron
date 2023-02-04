# {{Name}}
### {{Category}}
{{#if Input.length}}{{#each Input}}### {{Label}}:<hr>
{{/each}}{{/if}}

## Abilities:
{{#each Abilities}}
<input type="checkbox" />{{Text}}

{{/each}}
{{#with [Condition meter]}}## {{Label}}: ({{Max}}) {{#times Max}}<input type="checkbox" />{{/times}}{{#if Conditions.length}}

## Conditions:
<ul>{{#each Conditions}}<li><input type="checkbox" /> {{ this }}</li>{{/each}}</ul>{{/if}}
{{/with}}