cmake_minimum_required(VERSION 3.22.1)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

include_directories(${ANDROID_NDK}/sources/cxx-stl/llvm-libc++/include)
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/../../node_modules/expo-modules-core/android/src/main/cpp)

add_definitions(-DFOLLY_NO_CONFIG=1)
add_definitions(-DFOLLY_HAVE_LIBEVENT=0)
add_definitions(-DFOLLY_MOBILE=1)
add_definitions(-DFOLLY_USE_LIBCPP=1)
add_definitions(-DFOLLY_HAVE_LIBGFLAGS=0)
add_definitions(-DFOLLY_HAVE_LIBJEMALLOC=0)
add_definitions(-DFOLLY_HAVE_PREADV=0)
add_definitions(-DFOLLY_HAVE_PWRITEV=0)
add_definitions(-DFOLLY_HAVE_TFO=0)
add_definitions(-DFOLLY_USE_SYMBOLIZER=0)