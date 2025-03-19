import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Menu, Button, Divider } from "react-native-paper";
import { User, Search } from "lucide-react-native";

// Definimos la interfaz Contact
interface Contact {
  id: string;
  name: string;
  accountId: string;
}

// Props del componente
interface ContactSelectorProps {
  contacts: Contact[]; // Listado de contactos
  onSelect: (contact: Contact) => void; // Función que se ejecuta al seleccionar un contacto
}

const ContactSelector: React.FC<ContactSelectorProps> = ({ contacts, onSelect }) => {
  const [visible, setVisible] = useState(false); // Controla el menú desplegable
  const [searchQuery, setSearchQuery] = useState(""); // Filtro de búsqueda
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null); // Contacto seleccionado

  // Filtro de contactos
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact); // Establece el contacto seleccionado
    onSelect(contact); // Llama la función onSelect con el contacto seleccionado
    closeMenu();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecciona un contacto</Text>

      {/* Botón que despliega el menú */}
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            mode="outlined"
            onPress={openMenu}
            contentStyle={styles.menuButton}
            icon={() => <User size={20} color="#007bff" />}
          >
            {selectedContact ? selectedContact.name : "Seleccionar contacto"}
          </Button>
        }
        style={styles.menu} // Estilo para personalizar el ancho
      >
        {/* Barra de búsqueda */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#555" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar contacto"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <Divider />

        {/* Lista de contactos */}
        <ScrollView style={styles.menuList}>
          {filteredContacts.map((contact) => (
            <TouchableOpacity
              key={contact.id}
              style={styles.contactItem}
              onPress={() => handleSelectContact(contact)}
            >
              <User size={20} color="#555" />
              <View style={styles.contactDetails}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactAccount}>{contact.accountId}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Menu>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  menu: {
    width: 300,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 10,
  },
  menuButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#f9f9f9",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  searchIcon: {
    marginRight: 8,
  },
  menuList: {
    maxHeight: 200, // Limita la altura del menú desplegable
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  contactDetails: {
    marginLeft: 10,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  contactAccount: {
    fontSize: 14,
    color: "#777",
  },
});

export default ContactSelector;
