const apiKey = "YOUR_API_KEY";
const projectId = "your-project-id";
const managedZone = "your-managed-zone";

class GoogleDNS {
  constructor(
    private apiKey: string,
    private projectId: string,
    private managedZone: string
  ) {}

  //dodać typ zwracany
  async addDnsRecord() {
    const url = `https://dns.googleapis.com/dns/v1/projects/${this.projectId}/managedZones/${this.managedZone}/changes?key=${this.apiKey}`;

    const data = {
      additions: [
        {
          name: "example.com.",
          type: "A",
          ttl: 300,
          rrdatas: ["123.123.123.123"],
        },
        {
          name: "example.com.",
          type: "AAAA",
          ttl: 300,
          rrdatas: ["2001:0db8:85a3:0000:0000:8a2e:0370:7334"],
        },
      ],
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error adding DNS records: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("DNS records added successfully:", responseData);
      return responseData;
    } catch (error: any) {
      console.error("Error adding DNS records:", error.message);
    }
  }
}
