const _ = require('lodash')
const listWithThreeBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    }
  ]
/* 
    @Blog.Schema has shape:
        blog = {
            title: String,
            author: String, 
            url: String,
            likes: Number
        }

    @param blogs has shape: 
        blogs = [{blog}, ...]
*/

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    const totalLikes = 
        blogs
            .map(blog => blog.likes)
            .reduce((totalLikes, like) => {
                return totalLikes + like
            }, 0)
    return totalLikes
}

/*
    @param blogs: [array]
    @return favourite blog: {title: '', author: '', likes: ''}
*/
const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return {}

    let indexOfFavoriteBlog = 0
    let likesOfFavoriteBlog = 0

    blogs.forEach((blog, index) => {
        if (blog.likes > likesOfFavoriteBlog) {
            indexOfFavoriteBlog = index
            likesOfFavoriteBlog = blog.likes
        }
    })

    const favoriteBlog = blogs[indexOfFavoriteBlog]

    return {
        title: favoriteBlog.title,
        author: favoriteBlog.author,
        likes: favoriteBlog.likes
    }
}

/*
    @function mostBlogs    
    @param blogs: [blogs]
    @returns {author: [string], blogs: [num]}
        author: author with most number of blogs
        blogs: number of blogs written by author
*/

const mostBlogs = (blogs) => {    
    // create dictionary and populate with author name and number of blogs that author has written
    const dictionary = {}
    
    blogs.forEach(blog => {
        // If author exists, increment blog count
        if (dictionary.hasOwnProperty(blog.author)) {
            dictionary[blog.author] += 1
        }
        else {
            // If author does not exist, add author and initialize blog count to 1
            dictionary[blog.author] = 1
        }
    })

    const mostBlogs = {}
    
    Object.entries(dictionary).forEach(blog => {
        const author = blog[0]
        const numberOfBlogs = blog[1]
        // Add first author to mostBlogs
        if (_.isEmpty(mostBlogs)) {
            mostBlogs['author'] = author 
            mostBlogs['blogs'] = numberOfBlogs
        }
        else {
            if (numberOfBlogs > mostBlogs['blogs']) {
                mostBlogs['author'] = author
                mostBlogs['blogs'] = numberOfBlogs
            }
        }
    })
    return mostBlogs
}

/*
    @function mostLikes returns the author whose blog posts have the largest total number of likes    
    @param blogs: [blogs]
    @returns {author: [string], likes: [num]}
        author: author with most number of total likes
        likes: sum of all likes recieved by author
*/

const mostLikes = (blogs) => {
    // create dictionary and populate with author name and number of likes that author has recieved
    const dictionary = {}
    
    blogs.forEach(blog => {
        // If author exists, increment 'likes' count
        if (dictionary.hasOwnProperty(blog.author)) {
            dictionary[blog.author] += blog.likes
        }
        else {
            // If author does not exist, add author and initialize 'likes' count
            dictionary[blog.author] = blog.likes
        }
    })

    const mostLikes = {}
    
    Object.entries(dictionary).forEach(blog => {
        const author = blog[0]
        const numberOfLikes = blog[1]
        // Add first author to mostLikes
        if (_.isEmpty(mostLikes)) {
            mostLikes['author'] = author 
            mostLikes['likes'] = numberOfLikes
        }
        else {
            if (numberOfLikes > mostLikes['likes']) {
                mostLikes['author'] = author
                mostLikes['likes'] = numberOfLikes
            }
        }
    })
    return mostLikes
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}