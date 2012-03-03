---
date: 2011/02/21
title: Say hello to the new Mondongo's Query
---

I am really happy to announce the new Query of Mondongo. It is much more readable and human friendly.

If you have used Mondongo, you probably realised that sometimes you have to type too much to be able to
get simple results out of you database. And the same goes with [Symfony2 and DoctrineMongo](http://spf13.com/post/symfony2).
Some people call this "explicit code", but should really the explicit code be so long? I am convinced the new Mondongo's Query
is really explicit, maybe even more, and you can do things much faster. But as you don't have to believe me, I will show you ;)

I am going to compare three ways to work:
* the old Mondongo's way,
* the new Mondongo's Query and methods,
* and DoctrineMongo, another great ODM you probably know.

The first thing we need to do is accessing the repositories. This is also shorter.

    [php]
    // old
    $repository = $mondongo->getRepitory('Model\Article');

    // new
    $repository = \Model\Article::repository();

    // DoctrineMongo
    $repository = $documentManager->getRepository('Model\Article');

Then we can play with the new Query.

    [php]
    $query = \Model\Article::repository()->query();
    $query = \Model\Article::repository()->query($criteria);

    $query = \Model\Article::query();
    $query = \Model\Article::query($criteria);

    // methods (fluent interface)
    $query
        ->criteria($criteria)
        ->fields($fields)
        ->sort($sort)
        ->limit($limit)
        ->skip($skip)
        ->batchSize($batchSize)
        ->hint($hint)
        ->immortal($immortal)
        ->snapshot($snapshot)
        ->timeout($timeout)
    ;

    // query is only executed here
    foreach ($query as $result) { // iterating
    }
    $articles = $query->all();
    $article = $query->one();

    // and the count method executes the count efficient method
    $nb = $query->count();

Like you have seen, the query only executes the real database's query when you iterate or when you
 explicitly call methods like *all()*, *one()*, *find()* or *count()*. That means that you can customize the query
as you want.

    [php]
    $query = \Model\Article::query();

    if ($criteria) {
        $query->criteria($criteria);
    }
    if ($sort) {
        $query->sort($sort);
    }

    // you can apply the logic you want...

Let's see some more examples.

All results.

    [php]
    // old
    $articles = $mondongo->getRepository('Model\Article')->find();

    // new
    $articles = \Model\Article::query()->all();

    // DoctrineMongo
    $articles = $documentManager->getRepository('Model\Article')->findAll();

One result.

    [php]
    // old
    $article = $mondongo->getRepository('Model\Article')->findOne();

    // new
    $article = \Model\Article::query()->one();

    // DoctrineMongo
    $article = $documentManager->getRepository('Model\Article')->findOneBy(array());

Simple conditions.

    [php]
    // old
    $articles = $mondongo->getRepository('Model\Article')->find(array('is_active' => true));

    // new
    $articles = \Model\Article::query(array('is_active' => true));

    // DoctrineMongo
    $articles = $documentManager->getRepository('Model\Article')->findBy(array('is_active' => true));

Playing a little bit.

    [php]
    // old
    $articles = $mondongo->getRepository('Model\Article')->find(array('is_active' => true), array(
        'sort'  => array('date' => -1),
        'limit' => 10,
        'skip'  => 5,
    ));

    // new
    $articles = \Model\Article::query(array('is_active' => true))->sort(array('date' => -1))->limit(10)->skip(5);

    // DoctrineMongo
    $articles = $documentManager->query('find all from Model\Article where is_active = ? limit 10 skip 5 sort date desc', array(true));

And the famous find method.

    [php]
    // old
    $article = $mondongo->getRepository('Model\Article')->findOneById($id);

    // new
    $article = \Model\Article::repository()->find($id);
    $article = \Model\Article::find($id);

    // DoctrineMongo
    $article = $documentManager->getRepository('Model\Article')->find($id);

And now we can even use the *find()* method with an array of ids.

    [php]
    $article = \Model\Article::find($id);
    $articles = \Model\Article::find($ids);

### Too many static methods!

Well, probably most of you are thinking we are using static methods, and that is not good. And it's true,
static methods *usually* are not good, but if you take a look at how these static methods are implemented you
will see that they are only here to access the repository methods (???).

    [php]
    $repository = $mondongo->getRepository('Model\Article');
    $repository = \Model\Article::repository();

    $query = $mondongo->getRepository('Model\Article')->query();
    $query = \Model\Article::query();

    $article = $mondongo->getRepository('Model\Article')->find($id);
    $article = \Model\Article::find($id);

This means you can choose your prefered solution! Ff you don't like static methods you can type all the code if you like,
but if you want a rapid development, you will probably like the shorter methods ;)

### In Symfony2

If you use [Symfony2](http://symfony-reloaded.org/) like most of the people that use Mondongo or DoctrineMongo,
take a look at the difference in a controller.

    [php]
    // old
    $article = $this->get('mondongo')->getRepository('Model\Article')->findOneById($id);

    // new
    $article = \Model\Article::find($id);

    // DoctrineMongo
    $article = $this->get('doctrine.odm.mongodb.document_manager')->getRepository('Model\Article')->($id);
