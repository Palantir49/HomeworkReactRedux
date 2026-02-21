import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type { IAuthState, IRegisterFormData, IAuthResponse, ILoginFormData, IUser } from "../../types/auth.types";
import type { PayloadAction } from "@reduxjs/toolkit";


const initialState: IAuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
};


//actions

//register
export const registerUser = createAsyncThunk<
IAuthResponse, 
IRegisterFormData,
{rejectValue: string}
>(
    'auth/register',
    async(userData, {rejectWithValue}) => {

        try{

            const response = await new Promise<IAuthResponse>((resolve,reject) => {
                setTimeout(() => {

                    const user = localStorage.getItem("user")
                    if (user != null){
                          var parsedUser = JSON.parse(user);
                          if(parsedUser.email == userData.email)
                            {
                                reject(new Error('User with such email have already exist'));
                              //  return;
                            }
                    }
                   

                    resolve({
                        id: Date.now(),
                        email: userData.email,
                        name: userData.firstName + ' ' + userData.lastName,
                        password: userData.password
                    });
                }, 1000);
            });


            localStorage.setItem('user', JSON.stringify(response));
            return response;
        }

        catch (error){
            return rejectWithValue((error as Error).message)
        }
    }
)

//login
export const loginUser = createAsyncThunk<
    IAuthResponse,
    ILoginFormData,
    { rejectValue: string }
>(
    'auth/login',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await new Promise<IAuthResponse>((resolve, reject) => {
                setTimeout(() => {

                    const user = localStorage.getItem("user")
                    if (user == null){
                         reject(new Error('User does not exist.'))
                         //return;
                    }
                    var parsedUser = JSON.parse(user);

                    if (userData.email == parsedUser.email && userData.password == parsedUser.password) {
                        resolve({
                            id: Date.now(),
                            email: userData.email,
                            name: parsedUser.name,
                            password:parsedUser.password
                        });
                    } else {
                        reject(new Error('Email or password is incorrect'));
                    }
                }, 1000);
            });
            
            localStorage.setItem('user', JSON.stringify(response));
            return response;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);


export const logoutUser = createAsyncThunk<
null,
void,
{rejectValue: string}
>(
    'auth/logout',
    async () => {

       // localStorage.removeItem('user');
        return null;


    }
) 

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        checkAuthState: (state) => {
            const user = localStorage.getItem('user');
            if (user) {
                const parsedUser: IUser = JSON.parse(user);
                state.user = parsedUser;
                state.isAuthenticated = true;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка регистрации';
            })
        

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка входа';
            })
        
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            });
    }
});

export const { clearError, checkAuthState } = authSlice.actions;
export default authSlice.reducer;