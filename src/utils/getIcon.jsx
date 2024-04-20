


export const getIcon = (iconName) => {
    // import ettiğimiz iconlardan biri yoksa default icon döndüren fonsiyon
    const existingIcons = [
      "01d",
      "01n",
      "02d",
      "02n",
      "03d",
      "03n",
      "10d",
      "10n",
      "11d",
      "11n",
    ];
    if (existingIcons.includes(iconName)) {
      return iconName;
    }
    return "02d";
  };