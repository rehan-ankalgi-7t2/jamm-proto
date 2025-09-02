import { Colors } from '@/constants/Colors';
import activity_data from '@/data/activities.json';
import { databases } from '@/services/appwrite';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { yupResolver } from '@hookform/resolvers/yup';
import { ID } from 'appwrite';
import Constants from 'expo-constants';
import { useState } from 'react';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { Alert, Animated, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as yup from 'yup';
import CreateJammFab from './CreateJammFab';
import DateTimeSelector from './DateTimeSelector';
import Chip from './ui/Chip';

type TCreateJammSchema = {
    jamm_name: string,
    activity: string,
    total_guests: number,
    paid_by: 'free' | 'go_dutch' | 'split_the_bill' | 'on_me' | 'attendance_fee',
    description: string,
    from: Date,
    to: Date,
    location: string,
    map_url?: string
}

const totalGuestsLimit = [
    {
        label: "1",
        value: 1
    },
    {
        label: "2",
        value: 2
    },
    {
        label: "3",
        value: 3
    },
    {
        label: "4",
        value: 4
    },
    {
        label: "5",
        value: 5
    },
    {
        label: "6",
        value: 6
    },
    {
        label: "7",
        value: 7
    },
]

const paidByOptions = [
    {
        label: "Free",
        value: "free",
    },
    {
        label: "Go Dutch",
        value: 'go_dutch'
    },
    {
        label: "Split The Bill",
        value: 'split_the_bill'
    },
    {
        label: "It's on me",
        value: "on_me"
    },
    {
        label: "Attendance Fee applicable",
        value: 'attendance_fee'
    },
]

const schema = yup.object().shape({
    jamm_name: yup.string().required('Name is required').min(10, 'Name must be at least 10 characters'),
    activity: yup.string().required('Activity is required'),
    total_guests: yup.number().integer().min(1).max(7).required('Number of guests is required'),
    paid_by: yup
        .mixed<'free' | 'go_dutch' | 'split_the_bill' | 'on_me' | 'attendance_fee'>()
        .oneOf(['free', 'go_dutch', 'split_the_bill', 'on_me', 'attendance_fee'])
        .required('Payment option is required'),
    description: yup.string().max(200, 'Description must be less than 200 characters').required('Description is required'),
    from: yup.date().required('Start date is required'),
    to: yup.date().required('End date is required').min(yup.ref('from'), 'End date must be after start date'),
    location: yup.string().required('Location is required'),
    map_url: yup.string().url('Map URL must be a valid URL').optional()
});

type TCreateJammFormSlideModalProps = {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  slideAnim: Animated.Value
}

const CreateJammFormSlideModal: React.FC<TCreateJammFormSlideModalProps> = ({visible, setVisible, slideAnim}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<TCreateJammSchema>({
        resolver: yupResolver(schema) as Resolver<TCreateJammSchema>,
        defaultValues: {
            jamm_name: '',
            activity: '',
            total_guests: 1,
            paid_by: 'free',
            description: '',
            location: '',
            map_url: '',
            from: new Date(),
            to: new Date()
        }
    });

    // Watch form values to sync with UI
    const watchedActivity = watch('activity');
    const watchedTotalGuests = watch('total_guests');
    const watchedPaidBy = watch('paid_by');

    const handleFromDateChange = (date: Date) => {
        setValue('from', date, { shouldValidate: true });
    };

    const handleToDateChange = (date: Date) => {
        setValue('to', date, { shouldValidate: true });
    };

    const onSubmit = async (data: TCreateJammSchema) => {
        try {
            setIsSubmitting(true);
            
            // Prepare data for Appwrite
            const jammData = {
                jamm_name: data.jamm_name,
                activity: data.activity,
                total_guests: data.total_guests,
                paid_by: data.paid_by,
                description: data.description,
                from: data.from.toISOString(),
                to: data.to.toISOString(),
                location: data.location,
                map_url: data.map_url || null,
            };

            // Create document in Appwrite
            const response = await databases.createRow(
                Constants.expoConfig?.extra?.APPWRITE_DATABASE_ID, 
                'jams',
                ID.unique(),
                jammData
            );

            Alert.alert('Success', 'Your Jamm has been created successfully!');
            setVisible(false);
        } catch (error) {
            Alert.alert('Error', 'Failed to create Jamm. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

  return (
    <Modal transparent visible={visible} animationType="none">
        <View style={styles.overlay}>
          <Animated.View style={[styles.popup, { transform: [{ translateY: slideAnim }] }]}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 80 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.header}>
                        <TouchableOpacity 
                            style={{borderWidth: 3, padding: 4, borderRadius: 100, marginRight: 0, marginLeft: 'auto'}} 
                            onPress={() => setVisible(false)}
                        >
                            <MaterialIcons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.title, {textAlign: 'center', marginBottom: 40}]}>Create your Jamm</Text>
                    
                    {/* Jamm Name */}
                    <Controller
                        control={control}
                        name="jamm_name"
                        render={({ field: { onChange, value } }) => (
                            <View style={[styles.inputContainer, errors.jamm_name && styles.inputError]}>
                                <Text style={styles.label}>Jamm Name</Text>
                                <TextInput 
                                    placeholder='Type Here' 
                                    value={value}
                                    onChangeText={onChange} 
                                    style={styles.textInput}
                                />
                                <Text style={styles.helperText}>Min 10 characters • {value?.length || 0}/30</Text>
                            </View>
                        )}
                    />
                    {errors.jamm_name && <Text style={styles.error}>{errors.jamm_name.message}</Text>}

                    {/* Activity */}
                    <Controller
                        control={control}
                        name="activity"
                        render={({ field: { onChange } }) => (
                            <View style={[styles.inputContainer, errors.activity && styles.inputError]}>
                                <Text style={styles.label}>Activity</Text>
                                <View style={styles.chipContainer}>
                                    {activity_data.map((activity, index) => (
                                        <Chip 
                                            key={index} 
                                            label={activity.label} 
                                            value={activity.value} 
                                            selected={watchedActivity === activity.value} 
                                            onPress={() => {
                                                setValue('activity', activity.value, { shouldValidate: true });
                                                onChange(activity.value);
                                            }}
                                        />
                                    ))}
                                </View>
                            </View>
                        )}
                    />
                    {errors.activity && <Text style={styles.error}>{errors.activity.message}</Text>}

                    {/* Number of Guests */}
                    <Controller
                        control={control}
                        name="total_guests"
                        render={({ field: { onChange } }) => (
                            <View style={[styles.inputContainer, errors.total_guests && styles.inputError]}>
                                <Text style={styles.label}>Number of Guests</Text>
                                <View style={styles.chipContainer}>
                                    {totalGuestsLimit.map((guest, index) => (
                                        <Chip 
                                            key={index} 
                                            label={guest.label} 
                                            value={guest.value} 
                                            selected={watchedTotalGuests === guest.value} 
                                            onPress={() => {
                                                setValue('total_guests', guest.value, { shouldValidate: true });
                                                onChange(guest.value);
                                            }}
                                        />
                                    ))}
                                </View>
                            </View>
                        )}
                    />
                    {errors.total_guests && <Text style={styles.error}>{errors.total_guests.message}</Text>}

                    {/* Who's Paying? */}
                    <Controller
                        control={control}
                        name="paid_by"
                        render={({ field: { onChange } }) => (
                            <View style={[styles.inputContainer, errors.paid_by && styles.inputError]}>
                                <Text style={styles.label}>Who&apos;s Paying?</Text>
                                <View style={styles.chipContainer}>
                                    {paidByOptions.map((option, index) => (
                                        <Chip 
                                            key={index} 
                                            label={option.label} 
                                            value={option.value} 
                                            selected={watchedPaidBy === option.value} 
                                            onPress={() => {
                                                setValue('paid_by', option.value as any, { shouldValidate: true });
                                                onChange(option.value);
                                            }}
                                        />
                                    ))}
                                </View>
                            </View>
                        )}
                    />
                    {errors.paid_by && <Text style={styles.error}>{errors.paid_by.message}</Text>}

                    {/* Description */}
                    <Controller
                        control={control}
                        name="description"
                        render={({ field: { onChange, value } }) => (
                            <View style={[styles.inputContainer, errors.description && styles.inputError]}>
                                <Text style={styles.label}>Description</Text>
                                <TextInput 
                                    placeholder='Type Here' 
                                    value={value}
                                    onChangeText={onChange} 
                                    style={[styles.textInput, { height: 80 }]} 
                                    multiline
                                />
                                <Text style={styles.helperText}>{value?.length || 0}/200 characters</Text>
                            </View>
                        )}
                    />
                    {errors.description && <Text style={styles.error}>{errors.description.message}</Text>}
                    
                    {/* Location */}
                    <Controller
                        control={control}
                        name="location"
                        render={({ field: { onChange, value } }) => (
                            <View style={[styles.inputContainer, errors.location && styles.inputError]}>
                                <Text style={styles.label}>Location</Text>
                                <TextInput 
                                    placeholder='Type Here' 
                                    value={value}
                                    onChangeText={onChange} 
                                    style={styles.textInput}
                                />
                            </View>
                        )}
                    />
                    {errors.location && <Text style={styles.error}>{errors.location.message}</Text>}

                    {/* Map URL */}
                    <Controller
                        control={control}
                        name="map_url"
                        render={({ field: { onChange, value } }) => (
                            <View style={[styles.inputContainer, errors.map_url && styles.inputError]}>
                                <Text style={styles.label}>Map URL (Optional)</Text>
                                <TextInput 
                                    placeholder='https://maps.google.com/...' 
                                    value={value}
                                    onChangeText={onChange} 
                                    style={styles.textInput}
                                />
                            </View>
                        )}
                    />
                    {errors.map_url && <Text style={styles.error}>{errors.map_url.message}</Text>}

                    {/* Date & Time */}
                    <View style={[styles.inputContainer, (errors.from || errors.to) && styles.inputError]}>
                        <Text style={styles.label}>Date & Time</Text>
                        <DateTimeSelector label="From" onChange={handleFromDateChange} />
                        <DateTimeSelector label="To" onChange={handleToDateChange} />
                    </View>
                    {errors.from && <Text style={styles.error}>{errors.from.message}</Text>}
                    {errors.to && <Text style={styles.error}>{errors.to.message}</Text>}

                    {/* Hide from Circles (Optional) */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Hide from the Circles (Optional)</Text>
                        <View style={styles.chipContainer}>
                            {[
                                { label: 'Requested', value: 'requested' },
                                { label: 'Next Plan', value: 'next_plan' }
                            ].map((option, index) => (
                                <Chip 
                                    key={index} 
                                    label={option.label} 
                                    value={option.value} 
                                    selected={false}
                                    onPress={() => {
                                        console.log('Hide from circle:', option.value);
                                    }}
                                />
                            ))}
                        </View>
                    </View>

                    <CreateJammFab 
                        onPress={handleSubmit(onSubmit)} 
                        titleVerb={isSubmitting ? 'Posting...' : 'Post '}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
          </Animated.View>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  openButton: { backgroundColor: '#1e1e2f', padding: 12, borderRadius: 8 },
  buttonText: { color: 'white', fontSize: 16 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  popup: {
    backgroundColor: '#FBFBFB',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '96%',
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold' },
  inputContainer: {
    marginBottom: 16, 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    padding: 8
  },
  label: {
    fontSize: 18, 
    opacity: 0.4, 
    marginBottom: 16
  },
  textInput: {
    fontSize: 24
  },
  helperText: {
    fontSize: 16, 
    opacity: 0.4
  },
  chipContainer: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row' 
  },
  submitButton: { backgroundColor: '#1e1e2f', padding: 12, borderRadius: 8, marginTop: 15, alignItems: 'center' },
  submitText: { color: 'white', fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 24,
    height: 48
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 12,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
    paddingRight: 40,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default CreateJammFormSlideModal;