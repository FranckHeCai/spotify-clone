<script lang="ts">
    const currentTime = new Date()
    const currentHour = currentTime.getHours()
    let greeting = ""
    currentHour < 12
    ? greeting = "Good Morning"
    : currentHour < 18
        ? greeting = "Good Afternoon"
        : greeting = "Good Evening"

</script>

<h1 class="text-4xl font-bold">{greeting}</h1>