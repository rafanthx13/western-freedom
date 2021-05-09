
var fireHandler = {

  methods: {

    getFireBaseList(fireBaseListSnapshot) {
      let alist = []
      fireBaseListSnapshot.forEach(doc => {
        alist.push(doc.data())
      })
      return alist
    },

  }
}

export default fireHandler
