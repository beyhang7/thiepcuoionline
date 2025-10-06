    document.addEventListener("DOMContentLoaded", () => {
      const lat = 22.00835;
      const lng = 102.78335;
      const address = "Gia đình nhà trai";

      // Khởi tạo bản đồ
      const map = L.map("map").setView([lat, lng], 18); // zoom 18 mới thấy nhà cửa

      // Esri World Imagery (chuẩn)
      const esri = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "Tiles © Esri, Maxar",
          maxZoom: 20
        }
      ).addTo(map);

      // Esri Clarity (HD, rõ nét hơn trong đô thị)
      const esriClarity = L.tileLayer(
        "https://clarity.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "Tiles © Esri, Maxar",
          maxZoom: 20
        }
      );

      // Cho phép chọn lớp
      const baseMaps = {
        "Vệ tinh Esri": esri,
        "Vệ tinh Esri Clarity (HD)": esriClarity
      };
      L.control.layers(baseMaps).addTo(map);

      // Marker địa điểm
      L.marker([lat, lng]).addTo(map)
        .bindPopup(`<b>${address}</b>`)
        .openPopup();


    });