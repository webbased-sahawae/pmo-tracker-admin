<template>
  <div>
    <NuxtPage />
    <PrimeToast />
  </div>
</template>
<style>
input,
textarea {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
div {
  white-space: pre;
  text-wrap: wrap;
}
h1 {
  font-weight: 800;
  font-size: large;
}
h2 {
  font-weight: 800;
  font-size: medium;
}

.buttonAdd {
  padding: 0.25rem;
  border-radius: 9999px;
  border-color: rgb(77 124 15);
  border-width: 2px;
  color: rgb(77 124 15);
  width: fit-content;
  font-size: 0.875rem;
  line-height: 1.25rem;
  transition-duration: 500ms;
  cursor: pointer;
  text-align: center;
}
.buttonAdd:hover {
  font-weight: 900;
  color: #ffffff;
  background-color: rgb(77 124 15);
  border-color: rgb(77 124 15);
}
.buttonAdded {
  padding: 0.25rem;
  border-radius: 9999px;
  border-color: rgb(0, 0, 0);
  border-width: 2px;
  color: rgb(0, 0, 0);
  width: fit-content;
  font-size: 0.875rem;
  line-height: 1.25rem;
  transition-duration: 500ms;
  cursor: pointer;
}
.buttonDelete {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  border-width: 2px;
  border-color: #b91c1c;
  width: auto;
  color: #b91c1c;
  transition-duration: 500ms;
  cursor: pointer;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.buttonDelete:hover,
.buttonAdded:hover {
  font-weight: 900;
  color: #ffffff;
  background-color: #b91c1c;
  border-color: #b91c1c;
}
input,
textarea,
select,
.primeBox {
  border-width: 1px;
  border-radius: 5px;
  border-color: coral;
  resize: none;
  transition-duration: 500ms;
}
</style>
