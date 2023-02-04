---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---

<div id="skin-switch-container">
  <select id="skin-switch" onchange="changeSkin()">
    {%- for skin in page.available_skins %}
    {% if skin == 'classic' -%}
    <option value="style.css">classic</option>
    {%- else -%}
    <option value="{{ skin }}.css">{{ skin }}</option>
    {%- endif %}
    {%- endfor %}
  </select>
</div>
<br>

<script>
  document.getElementById("skin-switch-container").style.display = "block";
  var metaTag = document.getElementById("stylesheet");
  var SSHref = metaTag.href;
  var SSName = (SSHref.substring(SSHref.lastIndexOf('/') + 1));

  document.getElementById("skin-switch").value = SSName;
  function changeSkin() {
    metaTag.href = SSHref.replace(SSName, event.target.value);
  }
</script>