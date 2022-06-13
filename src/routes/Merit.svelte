<script>
  import { DataTable } from "carbon-components-svelte";
</script>

<h1 class="text-indigo-600 text-3xl font-bold ">About</h1>
<p class="mt-1 py-2">
  If you have any Merits or Demerits entered by teachers or administrators, you will see them here.
</p>

<DataTable
  headers={[
    { key: "name", value: "Name" },
    { key: "protocol", value: "Protocol" },
    { key: "port", value: "Port" },
    { key: "rule", value: "Rule" },
  ]}
  rows={[
    {
      id: "a",
      name: "Load Balancer 3",
      protocol: "HTTP",
      port: 3000,
      rule: "Round robin",
    },
    {
      id: "b",
      name: "Load Balancer 1",
      protocol: "HTTP",
      port: 443,
      rule: "Round robin",
    },
    {
      id: "c",
      name: "Load Balancer 2",
      protocol: "HTTP",
      port: 80,
      rule: "DNS delegation",
    },
    {
      id: "d",
      name: "Load Balancer 6",
      protocol: "HTTP",
      port: 3000,
      rule: "Round robin",
    },
    {
      id: "e",
      name: "Load Balancer 4",
      protocol: "HTTP",
      port: 443,
      rule: "Round robin",
    },
    {
      id: "f",
      name: "Load Balancer 5",
      protocol: "HTTP",
      port: 80,
      rule: "DNS delegation",
    },
  ]}
/>
