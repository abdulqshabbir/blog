const { totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('../utils/list_helper')

const emptyList = []

const listWithOneBlog = [{
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
}]

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

const listWithFiveBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    }, 
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React Docs",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 2,
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
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Bob Ross",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 3,
        __v: 0
    }
  ]

describe('total likes', () => {
    const emptyList = []
    test('List with single blog returns correct # of likes', () => {
        expect(totalLikes(listWithOneBlog)).toBe(5)
    })

    test('List with three blogs returns correct # of likes', () => {
        expect(totalLikes(listWithThreeBlogs)).toBe(24)
    })

    test('List with no blogs returns 0', () => {
        expect(totalLikes(emptyList)).toBe(0)
    })
})

describe('favorite blog', () => {
    test('empty blog returns empty object', () => {
        expect(favoriteBlog(emptyList)).toEqual({})
    })
    test('single blog returns that blog\'s # of likes', () => {
        expect(favoriteBlog(listWithOneBlog)).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })
    test('multiple blogs returns that blog with most # of likes', () => {
        expect(favoriteBlog(listWithThreeBlogs)).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
        })
    })
})

describe('most blogs', () => {
    test('List with no blogs returns 0', () => {
        expect(totalLikes(emptyList)).toEqual(0)
    })

    test('single blog returns that author and 1 blog', () => {
        expect(mostBlogs(listWithOneBlog)).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1
        })
    })

    test('multiple blogs returns author with most # of blogs', () => {
        expect(mostBlogs(listWithThreeBlogs)).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 2
        })
    })
})

describe('most likes', () => {
    test('Single blog returns author and his/her number of likes', () => {
        expect(mostLikes(listWithOneBlog)).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })
    test('Multiple blogs returns author with most # of likes', () => {
        expect(mostLikes(listWithThreeBlogs)).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17
        })
    })
    test('Multiple blogs returns author with most # of likes', () => {
        expect(mostLikes(listWithFiveBlogs)).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 20
        })
    })
})