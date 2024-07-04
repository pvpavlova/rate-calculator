<script setup>
import { ref, onMounted } from "vue";
import { RateService } from "@/service/RateService";
import currencyapi from "@everapi/currencyapi-js";

const client = new currencyapi(
  "cur_live_7HcIHpFbB6gn0Chi7Ufp3rHNX448k6jXnRZvYSWe"
);
const currenciess = ref([]);
client
  .latest({
    base_currency: "RUB",
    currencies: "KZT,CNY",
  })

  .then((response) => {
    currenciess.value = response.data;
    return currenciess;
  });
console.log(currenciess);
const selectedRate = ref();
const selectedPrice = ref();
const selectedCurrency = ref();
const rates = ref([
  {
    id: 1,
    key: "001",
    name: "Basic",
    description: "Стандартный тариф",
    monthRate: 100,
    yearRate: 1000,
    fullYearRate: 1200,
  },
  {
    id: 2,
    key: "002",
    name: "Advanced",
    description: "Продвинутый тариф",
    monthRate: 150,
    yearRate: 1400,
    fullYearRate: 1800,
  },
]);
onMounted(() => {
  RateService.getRates().then((data) => (rates.value = data.slice(0, 12)));
});
</script>
<template>
  <Stepper value="1" linear>
    <StepList>
      <Step value="1">Выбор тарифа</Step>
      <Step value="2"> Выбор периода оплаты</Step>
      <Step value="3">Выбор валюты</Step>
      <Step value="4">Проверка</Step>
    </StepList>
    <StepPanels>
      <StepPanel v-slot="{ activateCallback }" value="1">
        <h2>Выберите тариф</h2>
        <div class="card">
          <div v-for="rate in rates" :key="rate.key">
            <Card class="card">
              <template #title>{{ rate.name }}</template>
              <template #subtitle>
                <div class="card-content">
                  {{ rate.description }}
                </div></template
              >
              <template #content>
                <div>
                  Стоимость за год:
                  <div class="rcol">
                    {{ rate.fullYearRate }}
                  </div>
                  {{ rate.yearRate }}
                </div>
                <div class="red">
                  Скидка:
                  {{
                    Math.round(100 - (rate.yearRate * 100) / rate.fullYearRate)
                  }}
                  %
                </div>
                <div>
                  Стоимость за месяц:
                  {{ rate.monthRate }}
                </div>
              </template>

              <template #footer>
                <RadioButton
                  v-model="selectedRate"
                  :inputId="rates.key"
                  :value="rate"
                  name="dynamic"
                />
              </template>
            </Card>
          </div>
        </div>
        <Button
          v-show="selectedRate"
          label="Далее"
          @click="activateCallback('2')"
        />
      </StepPanel>
      <StepPanel v-slot="{ activateCallback }" value="2">
        <h2>Выберите период оплаты</h2>
        <div class="flex flex-col h-48">
          <div
            class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
          >
            <Card class="card">
              <template #title>{{ selectedRate.name }}</template>
              <template #subtitle>
                <div class="card-content">
                  {{ selectedRate.description }}
                </div></template
              >
              <template #content>
                <div>
                  <RadioButton
                    v-model="selectedPrice"
                    :inputId="selectedRate.yearRate"
                    :value="selectedRate.yearRate"
                  />
                  Стоимость за год:

                  {{ selectedRate.yearRate }}
                  <div class="rcol">
                    {{ selectedRate.fullYearRate }}
                  </div>
                  <div class="red">
                    Скидка:
                    {{
                      Math.round(
                        100 -
                          (selectedRate.yearRate * 100) /
                            selectedRate.fullYearRate
                      )
                    }}
                    %
                  </div>
                </div>
                <div class="month">
                  <RadioButton
                    v-model="selectedPrice"
                    :inputId="selectedRate.monthRate"
                    :value="selectedRate.monthRate"
                  />
                  Стоимость за месяц: {{ selectedRate.monthRate }}
                </div>
              </template></Card
            >
          </div>
        </div>
        <Button
          label="Назад"
          severity="secondary"
          @click="activateCallback('1')"
        />
        <Button
          label="Далее"
          v-show="selectedPrice"
          @click="activateCallback('3')"
        />
      </StepPanel>
      <StepPanel v-slot="{ activateCallback }" value="3">
        <h2>Валюта для оплаты</h2>
        <div>{{}}</div>
        <div class="flex flex-col h-48">
          <Card class="card">
            <template #content>
              <div>
                <RadioButton
                  v-model="selectedCurrency"
                  :inputId="1"
                  :value="selectedPrice"
                />
                Рубли: {{ selectedPrice }}
              </div>
              <div class="month">
                <RadioButton
                  v-model="selectedCurrency"
                  :inputId="2"
                  :value="
                    Math.round(
                      (currenciess.KZT.value * selectedPrice).toFixed(2)
                    )
                  "
                />
                Тенге:
                {{
                  Math.round((currenciess.KZT.value * selectedPrice).toFixed(2))
                }}
              </div>
              <div class="month">
                <RadioButton
                  v-model="selectedCurrency"
                  :inputId="3"
                  :value="
                    Math.round(
                      (currenciess.CNY.value * selectedPrice).toFixed(2)
                    )
                  "
                />
                Юань:
                {{
                  Math.round((currenciess.CNY.value * selectedPrice).toFixed(2))
                }}
              </div>
            </template></Card
          >
        </div>
        <div>
          <Button
            label="Назад"
            severity="secondary"
            @click="activateCallback('2')"
          />
          <Button
            label="Далее"
            v-show="selectedCurrency"
            @click="activateCallback('4')"
          />
        </div>
      </StepPanel>
      <StepPanel v-slot="{ activateCallback }" value="4">
        <h2>Подтвердите Ваш выбор</h2>
        <div>Тариф : {{ selectedRate.description }}</div>
        Cумма в выбранной валюте:
        {{ selectedCurrency }}
        <div>
          <Button
            label="Назад"
            severity="secondary"
            @click="activateCallback('3')"
          />
        </div>
      </StepPanel>
    </StepPanels>
  </Stepper>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}
.r-btn {
  width: 10rem;
}
.rcol {
  text-decoration: line-through;
  text-decoration-color: red;
}
.card-content {
  font-size: 1rem;

  margin-bottom: 1rem;
}
.month {
  margin-top: 1rem;
}
Button {
  margin-top: 2rem;
  margin-right: 1rem;
}
RadioButton {
  margin-top: 1rem;
  margin-left: 1rem;
}
.red {
  color: red;
}
</style>
