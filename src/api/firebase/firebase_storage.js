import firebase from 'firebase'



export const uploadToFirebase = (acceptedFiles, prefix) => {
  const p = new Promise((res, rej) => {
    // Create a root reference
    const storageRef = firebase.storage().ref()
    const allImages = acceptedFiles.map((file)=>{
      const fileLocation = storageRef.child(`${prefix}/${file.name}`)
      return fileLocation.put(file).then((snapshot)=>{
        console.log(fileLocation.getDownloadURL())
        return fileLocation.getDownloadURL()
      })
    })
    Promise.all(allImages).then((results) => {
      console.log(results)
      //storageRef.child('images/stars.jpg').getDownloadURL()
      res(results)
    }).catch((err)=>{
      console.log(err)
      rej(err)
    })
  })
  return p
}
