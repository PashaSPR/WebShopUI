// import React from 'react'
// import {
//     Button,
//     Card,
//     CardContent, DialogActions,
//     Modal, TextField
// } from "@mui/material";

// const PropertyValueEditModal = ({
//     appointPropertyValueModalOpen, setAppointPropertyValueModalOpen,
//     editedPropertyValue, setEditedPropertyValue,
//     editedProperty,
//     editedValue, setEditedValue,


//     handleSavePropertyValue, // Отримуємо функцію з пропс
// }) => {

//     return <>

//         <Modal
//             style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 zIndex: "50000"
//             }}
//             open={appointPropertyValueModalOpen}
//             onClose={() => { setAppointPropertyValueModalOpen(false); }}
//             aria-labelledby="parent-modal-title"
//             aria-describedby="parent-modal-description"
//         >
//             <Card
//                 style={{
//                     minWidth: "400px",
//                     padding: "10px"
//                 }}
//             >
//                 <CardContent
//                     style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         gap: "15px"
//                     }}
//                 >
//                     {/* <TextField
//                         label="New Good Name"
//                         value={editedPropertyValue}
//                         onChange={(e) => setEditedPropertyValue(e.target.value)}
//                         fullWidth
//                     /> */}
//                     <TextField
//                         sx={{ marginTop: '20px' }}
//                         label="Значення властивості"
//                         type={editedProperty?.type === 'INTEGER' || editedProperty?.type === 'FLOAT' ? 'number' : 'text'}
//                         value={editedValue}
//                         onChange={(e) => setEditedValue(e.target.value)}
//                         multiline={editedProperty?.type === 'TEXT' || editedProperty?.type === 'STRING'}
//                         rows={editedProperty?.type === 'TEXT' || editedProperty?.type === 'STRING' ? 4 : undefined}
//                         fullWidth
//                         inputProps={{
//                             step: editedProperty?.type === 'FLOAT' ? '0.01' : undefined, // Для дробових чисел
//                         }}
//                         select={editedProperty?.type === 'BOOLEAN'} // Для типу BOOLEAN
//                         SelectProps={{
//                             native: editedProperty?.type === 'BOOLEAN', // Якщо це select для BOOLEAN, використовуйте нативний HTML select
//                         }}
//                     >
//                         {/* Додаємо опції для BOOLEAN */}
//                         {editedProperty?.type === 'BOOLEAN' && (
//                             <>
//                                 <option value="true">Так</option>
//                                 <option value="false">Ні</option>
//                             </>
//                         )}
//                     </TextField>

//                     {editedProperty?.type === 'DATE' && (
//                         <TextField
//                             sx={{ marginTop: '20px' }}
//                             label="Значення властивості (дата)"
//                             type="date"
//                             value={editedValue}
//                             onChange={(e) => setEditedValue(e.target.value)}
//                             fullWidth
//                         />
//                     )}

//                 </CardContent>
//                 <DialogActions>
//                     <Button variant="outlined" color="error" onClick={() => setAppointPropertyValueModalOpen(false)}>Скасувати</Button>
//                     <Button variant="outlined" onClick={handleSavePropertyValue}>Зберегти</Button>
//                 </DialogActions>
//             </Card>
//         </Modal>
//     </>;

// };

// export default PropertyValueEditModal




import React from 'react'
import {
    Button,
    Card,
    CardContent,
    DialogActions,
    DialogTitle,
    Modal,
    TextField
} from "@mui/material";

const PropertyValueEditModal = ({
    appointPropertyValueModalOpen,
    setAppointPropertyValueModalOpen,
    editedPropertyValue,
    setEditedPropertyValue,
    editedProperty,
    editedValue,
    setEditedValue,
    handleSavePropertyValue,
}) => {
    return (
        <Modal
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: "50000",
            }}
            open={appointPropertyValueModalOpen}
            onClose={() => { setAppointPropertyValueModalOpen(false); }}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Card
                style={{
                    minWidth: "400px",
                    padding: "10px",
                }}
            >
                <DialogTitle>
                    {editedProperty?.propertiesName ?? ""}
                </DialogTitle>
                <CardContent
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                    }}
                >
                    <TextField
                        sx={{ marginTop: '20px' }}
                        label="Значення властивості"
                        type={editedProperty?.type === 'INTEGER' || editedProperty?.type === 'FLOAT' ? 'number' : 'text'}
                        value={editedProperty?.type === 'INTEGER' || editedProperty?.type === 'FLOAT' ? Math.max(1,editedValue) : editedValue}
                        onChange={(e) => setEditedValue(e.target.value)}
                        multiline={editedProperty?.type === 'TEXT' || editedProperty?.type === 'STRING'}
                        rows={editedProperty?.type === 'TEXT' || editedProperty?.type === 'STRING' ? 4 : undefined}
                        fullWidth
                        inputProps={{
                            step: editedProperty?.type === 'FLOAT' ? '0.01' : undefined,
                        }}
                        select={editedProperty?.type === 'BOOLEAN'}
                        SelectProps={{
                            native: editedProperty?.type === 'BOOLEAN',
                        }}
                    >
                        {editedProperty?.type === 'BOOLEAN' && (
                            <>
                                <option value="true">Так</option>
                                <option value="false">Ні</option>
                            </>
                        )}
                    </TextField>

                    {editedProperty?.type === 'DATE' && (
                        <TextField
                            sx={{ marginTop: '20px' }}
                            label="Значення властивості (дата)"
                            type="date"
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                            fullWidth
                        />
                    )}
                </CardContent>
                <DialogActions>
                    <Button variant="outlined" color="error" onClick={() => setAppointPropertyValueModalOpen(false)}>Скасувати</Button>
                    <Button variant="outlined" onClick={handleSavePropertyValue}>Зберегти</Button>
                </DialogActions>
            </Card>
        </Modal>
    );
};

export default PropertyValueEditModal;
