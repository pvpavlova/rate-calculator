/* eslint-disable vue/multi-word-component-names */
import { createApp } from "vue";
import App from "./App.vue";

import Aura from "@primevue/themes/aura";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Stepper from "primevue/stepper";
import StepList from "primevue/steplist";
import StepPanels from "primevue/steppanels";
import StepItem from "primevue/stepitem";
import Step from "primevue/step";
import StepPanel from "primevue/steppanel";
import SelectButton from "primevue/selectbutton";
import RadioButton from "primevue/radiobutton";
import DataView from "primevue/dataview";
import Select from "primevue/select";
import Card from "primevue/card";

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.component("Button", Button);
app.component("Stepper", Stepper);
app.component("StepList", StepList);
app.component("StepPanels", StepPanels);
app.component("StepItem", StepItem);
app.component("Step", Step);
app.component("StepPanel", StepPanel);
app.component("Card", Card);
app.component("DataView", DataView);
app.component("SelectButton", SelectButton);
app.component("RadioButton", RadioButton);
app.component("Select", Select);
app.mount("#app");
