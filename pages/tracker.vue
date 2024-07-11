<template>
  <div class="w-full h-[100vh]">
    <div class="bg-black h-[10vh]">
      <Header />
    </div>
    <div class="grid grid-cols-6 h-[85vh]">
      <div class="col-span-1">
        <SideNav />
      </div>
      <div class="col-span-5 p-2 w-full overflow-auto h-[85vh]">
        <NuxtPage />
      </div>
    </div>
    <div>
      <div class="col-span-6 bg-dprimary h-[5vh]">
        <Footer />
      </div>
    </div>
  </div>
</template>
