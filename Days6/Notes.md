```````````````````````````````````````
Days 6 (Thread Pool)
```````````````````````````````````````
A thread pool is group of background threads that hepl Nodejs to perform heavy task (like file reading or writing, encryption etc) without blocking the main thread.

Nodejs uses a single main thread (called the Event Loop) to handle all your js code. But when you do heavy or slow tasks (like reading or writing file, making network reqest etc) these tasks can block our app. 
so, nodejs uses a threadpool to handle such a operation in the background.

By default nodejs has 4 threads in its Pool.
you can increase it(upto 128) using
``````````````````````````````````````
set UV_THREADPOOL_SIZE=128
`````````````````````````````````````