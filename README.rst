.. This README is meant for consumption by humans and pypi. Pypi can render rst files so please do not use Sphinx features.
   If you want to learn more about writing documentation, please check out: http://docs.plone.org/about/documentation_styleguide.html
   This text does not appear on pypi or github. It is a comment.

=================
redturtle.gallery
=================

Plone addon that adds a gallery view with a carousel made with slick.
  

Features
--------

- **Gallery view**  
It adds a view called *gallery_view* and it's appliable to a folder that contains images. This view renders the images in natural dimensions and at click they open in a modal.
  
- **Gallery modal** 
It's the modal opened by clicking on images in *Gallery view*. It's a Plone modal made with `Mockup`__ with a `Slick`__ carousel inside.


__ https://github.com/plone/mockup/
__ http://kenwheeler.github.io/slick/


Examples
--------

- **Gallery view**

.. image:: https://github.com/RedTurtle/redturtle.gallery/blob/master/docs/screenshots/gallery_view.png
   :alt: Gallery view preview
  
  
- **Gallery modal**

.. image:: https://github.com/RedTurtle/redturtle.gallery/blob/master/docs/screenshots/gallery_modal.png
   :alt: Gallery modal preview


Translations
------------

This product has been translated into

- Italian


Installation
------------

Install redturtle.gallery by adding it to your buildout::

    [buildout]

    ...

    eggs =
        redturtle.gallery


and then running ``bin/buildout``


Dependencies
------------

This product has been tested on Plone 5.1
  

Credits
------------

Developed with the support of `Regione Emilia Romagna`__.

__ http://www.regione.emilia-romagna.it/



Authors
------------

This product was developed by RedTurtle Technology team.

.. image:: http://www.redturtle.it/redturtle_banner.png
   :alt: RedTurtle Technology Site
   :target: http://www.redturtle.it/
