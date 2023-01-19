# Pokedex - React Native App

**First React Native App Project**

### Android Virtual Device (AVD) Configuration

**Phone Model:** Pixel 4 (5.7 1080x2280 440dpi) \
**Android Version:** Android 13.0 (Tiramisu x86_64) \
**API Level:** 33

### Features used

**🏗 Built with React-Native (TypeScript) using Expo CLI**\
**🛣 Routing and Navigation with React-Navigation**\
**🧪 Testing powered by Jest**\
**🧰 Design packages are NOT used (ex, materials, ant, react native papers, etc.)**\
**💾 State management - RTK (Redux tool kit). (ex. RTK Slice to save information)**\
**🌐 Api calls with RTK Query.**

## APP Description

- UI applied from [https://xd.adobe.com/view/e17aee6f-8b3d-4d70-9cab-931d05ddb440-b429](https://xd.adobe.com/view/e17aee6f-8b3d-4d70-9cab-931d05ddb440-b429)
- Navigation between screens with **React-Navigation**
- Initial route **HomeScreen**
- ScrollView should be feeded with data fetched from a [https://pokeapi.co/api/v2/pokemon?offset=0&limit=20](https://pokeapi.co/api/v2/pokemon?offset=0&limit=20)
- Ability to fetch all pokemons
- List of each Pokemon needs to appear there with the name
- On tap a pokemon should link to DetailScreen passing id as parameter

### DetailScreen

- Items details fetched from [https://pokeapi.co/api/v2/pokemon/id/](https://pokeapi.co/api/v2/pokemon/id/)
- Display the information that shows on the design
- Save or remove pokemon from WishList

### WishListScreen

- List all pokemon saved previously
- Show the information that appears on the design
- We need to find our pokemons saved by search bar
- We can remove each pokemon that we want

**_*Few tests added*_**
