import { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

import Auth from '../utils/auth';
import { getDeals, getDeal, gameSearch, gameSearchExact, gameSearchbyId } from '../utils/API';

