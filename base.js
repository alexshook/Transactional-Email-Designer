(function( $ ) {

  $.fn.listable = function( options ) {
    var settings = $.extend({
      addListItemButton: $('#add-list-item'),
      listItemPlaceholder: 'New List Item'
    }, options );

    var currentItem = 1;
    var list = this;
    var addListItemButton = settings.addListItemButton;

    // Using the jQuery sortable plugin, let's enable
    // drag and drop sorting
    list.sortable({
      items: "tr",
      revert: true,
      cancel: ':input,button,[contenteditable]',
      helper: function(e, tr)
      {
        var $originals = tr.children();
        var $helper = tr.clone();
        $helper.children().each(function(index)
        {
          // Set helper cell sizes to match the original sizes
          $(this).width($originals.eq(index).width());
          $(this).height($originals.eq(index).height());
        });
        return $helper;
      }
    });

    // Fade In and Fade Out the Remove link on hover
    list.delegate('tr', 'mouseover mouseout', function(event) {
      var $this = $(this).find('a.delete');

      if(event.type === 'mouseover') {
          $this.stop(true, true).fadeIn();
      } else {
          $this.stop(true, true).fadeOut();
      }
    });

    addListItemButton.click(function(e) {
      e.preventDefault();
      addItem('listItem');
    });

    // Delete item button clicked
    list.delegate('a.delete', 'click', function(e) {
      var $this = $(this);

      e.preventDefault();
      removeItem($this);
    });

    // must use delegate for click event
    // because .content-block is also .sortable
    list.delegate('.content-block', 'click', function(e) {
      e.preventDefault();
    });

    function removeElement() {
      return "<a href='#' class='delete'>[x]</a>";
    }

    function listItemElement() {
      return "<tr id='item-" + currentItem + "'>"
      + "<td class='content-block'>"
      + "<div class='list-item' contenteditable='true'>"
      + settings.listItemPlaceholder
      + "</div>" + removeElement()
      + "</td></tr>";
    }

    // Add a new item of a given type to the list
    // this method takes any number of params, depending on the
    // type of the item to add, the additional params can be used
    // to send extra information. See 'url' for an example
    function addItem(type) {
      switch (type) {
        case "listItem":
          list.append( listItemElement() );
          break;
        default:
          throw "Type not implemented";
          break;
      }

      // Hide the new item, then fade it in for effects
      $("#item-" + currentItem)
        .css('display', 'none')
        .fadeIn();

      currentItem++;
    }

    function removeItem($this) {
      var parentId = $this.parent().attr('id');

      // Fade out the list item then remove from DOM
      $this.parent().fadeOut(function() {
          $this.parent().remove();
      });
    }

    return this;
  }
}( jQuery ));
