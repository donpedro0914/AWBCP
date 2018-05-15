@extends('layouts.app')

@section('content')
<div class="content">
    <div class="row">
        <div class="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
            <div class="block block-themed animated fadeIn">
                <div class="block-header bg-primary">
                    <h3 class="block-title">Login</h3>
                </div>
                <div class="block-content block-content-full block-content-narrow">
                    <div class="h2 font-w600 push-30-t push-5 center">
                        {{ HTML::image('img/avantice-logo.jpg', 'Infinity Logo', array('style' => 'display:block;margin:0 auto;width:475px;')) }}
                    </div>
                    <form action="{{ route('login') }}" class="form-horizontal push-30-t push-50" id="loginForm" name="loginForm" method="post">

                        {{ csrf_field() }}
                        
                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <div class="col-xs-12">
                                <div class="form-material">
                                    <input id="email" type="text" class="form-control" name="email" value="{{ old('email') }}" required autofocus>
                                    <label>Username</label>
                                    
                                    @if ($errors->has('email'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('email') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            <div class="col-xs-12">
                                <div class="form-material">
                                    <input id="password" type="password" class="form-control" name="password" required autofocus>
                                    <label>Password</label>
                                    
                                    @if ($errors->has('password'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('password') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-8 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">
                                    Login
                                </button>

                                <a class="btn btn-link" href="{{ route('password.request') }}">
                                    Forgot Your Password?
                                </a>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
