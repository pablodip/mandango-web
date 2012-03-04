---
title: Introduction
---

These are the official behaviors of Mandango.

  * **Timestampable**: saves the creation and/or update date in the documents
  * **Ipable**: saves the IP from where documents are created and/or saved
  * **Sluggable**: saves the *slug* of a field in the documents

Installation
------------

You can install them directly, from git, svn.

### Directly

You can download directly from
[tar](http://github.com/mandango/mandango-behaviors/tarball/master) or
[zip](http://github.com/mandango/mandango-behaviors/zipball/master).

### Git

http://github.com/mandango/mandango-behaviors

### Subversion

There is an access through Subversion to the Git repository.

http://svn.github.com/mandango/mandango-behaviors

Configuration
-------------

To use these behaviors you just have to add their namespace to the class loader:

    [php]
    use Symfony\Component\ClassLoader\UniversalClassLoader;

    $loader = new UniversalClassLoader();
    $loader->registerNamespaces(array(
        'Mandango\Behavior' => '/path/to/mandango-behaviors/src',
        'Mandango'          => '/path/to/mandango/src',
    ));
    $loader->register();