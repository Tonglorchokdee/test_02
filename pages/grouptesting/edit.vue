<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <v-card>
        <v-card-title class="headline">แก้ไขชุดข้อสอบ</v-card-title>
        <v-card-text>
          <grouptesting-form :id="id" form="edit" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import moment from "moment";

export default {
  auth: true,
  name: "GroupTestingEdit",
  layout: "dashboard",
  data: function () {
    return {
      id: 0,
      loading: true,
    };
  },
  created() {
    if (this.$route.query.id) {
      this.id = Number(this.$route.query.id);
    }
  },
};
</script>
