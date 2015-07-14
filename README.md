# Listable

This is a fork of the [Transactional Email Designer](https://github.com/raulriera/Transactional-Email-Designer) by Raul Riera. It is meant to be used just for lists.

The only dependencies are jQuery and jQuery UI.

Add the button:

```
<div class="centered">
  <button id="add-list-item">+</button>
</div>
```

Initialize the library:

```
<script>
  $().ready(function() {
    $("td.content-wrap > table").listable();
  });
</script>
```
