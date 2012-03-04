---
title: Unit Of Work
---

Mandango implements the [Unit Of Work](http://martinfowler.com/eaaCatalog/unitOfWork.html)
pattern, which simply means "send all database operation at once".

Let's see an example:

    [php]
    // prepare database operations
    $author = $mandango->create('Model\Author')->setName('pablodip');
    $mandango->persist($author);

    $category1 = $mandango->create('Model\Category')->setName('MongoDB');
    $category2 = $mandango->create('Model\Category')->setName('PHP');
    $mandango->persist(array($category1, $category2));

    $article = $articleRepository->createQuery(array('name' => 'Mondongo'))->one();
    $article
        ->setName('Mandango')
        ->setAuthor($author)
        ->addCategories(array($category1, $category2))
    ;
    $mandango->persist($article);

    $articles = $articleRepository->createQuery(array('type' => 'foo'))->all();
    $mandango->remove($articles);

    // send all database operations at once
    $mandango->flush();

Like you can see this is a really powerful way to work, because you can
prepare all the database operations, and when all of them are ready, you
just have to send them to the database.

MongoDB does not have transactions, so this is probably the best way you
can work if you want avoid as much as possible database inconsistency
because of application breaks.

And this is also the best way to get the maximum database performance, because
Mandango does that the database operations are as efficient as possible.