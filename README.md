# WARNING (USE AT OWN RISK)
This code is not clean and it was not designed with production in mind. I built this for development purposes and it may use some methods that could pose a security risk.


# How to use
```
var lookingFor = ['Array', 'Array.prototype', ...]
window.getNativeMethods().then(nativeMethodList => {
  console.log('Object of native methods', nativeMethods); // { 'Array': [...], 'Array.prototype': [...], ...} 
})
```
